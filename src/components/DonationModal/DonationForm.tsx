import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { SelectAmountStep } from './SelectAmountStep';
import { PayPalStep } from './PayPalStep';
import { SuccessStep } from './SuccessStep';
import type { Step } from './types';
import {
  type Direction,
  animateStepOut,
  animateStepIn,
  animateModalIn,
  animateModalOut,
} from './animation';

interface DonationFormProps {
  onClose: () => void;
}

export function DonationForm({ onClose }: DonationFormProps) {
  const [step, setStep] = useState<Step>('select');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const cardRef = useRef<HTMLDivElement>(null);
  const stepContentRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<Direction>('forward');

  const effectiveAmount = selectedAmount ?? (customAmount ? parseFloat(customAmount) : null);

  // ── Transition helper ──────────────────────────────────────────────────────

  const navigateTo = useCallback((nextStep: Step, direction: Direction = 'forward') => {
    const el = stepContentRef.current;
    directionRef.current = direction;
    if (!el) {
      setStep(nextStep);
      return;
    }
    animateStepOut(el, direction, () => setStep(nextStep));
  }, []);

  // Slide new step content in after React mounts it
  useLayoutEffect(() => {
    const el = stepContentRef.current;
    if (!el) return;
    animateStepIn(el, directionRef.current);
  }, [step]);

  // Modal card entrance on mount
  useLayoutEffect(() => {
    if (cardRef.current) animateModalIn(cardRef.current);
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setErrorMessage('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
    setErrorMessage('');
  };

  const handleDonate = () => {
    if (!effectiveAmount || effectiveAmount <= 0) return;
    navigateTo('paypal', 'forward');
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    navigateTo('select', 'back');
  };

  // ── Close with exit animation ─────────────────────────────────────────────

  const handleClose = useCallback(() => {
    if (cardRef.current) animateModalOut(cardRef.current, onClose);
  }, [onClose]);

  // ── Side effects ──────────────────────────────────────────────────────────

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Modal de donación"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={cardRef}
        className="desktop:max-w-[60%] relative z-10 flex h-auto max-h-[92dvh] min-h-[60dvh] w-full max-w-[90%] overflow-hidden rounded-2xl bg-white shadow-2xl will-change-[transform,opacity] sm:h-[60%] sm:max-h-none"
      >
        {/* Close button — absolute at the top-right corner of the whole card */}
        <button
          onClick={handleClose}
          className="text-gray absolute top-3 right-3 z-20 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
          aria-label="Cerrar modal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex min-h-0 w-full flex-col gap-8 p-6 sm:w-[55%] sm:gap-10 sm:p-8">
          <ModalHeader />

          {/* Step content — this element slides in/out on step transitions */}
          <div
            ref={stepContentRef}
            className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pr-1 will-change-[transform,opacity]"
          >
            {step === 'success' && (
              <SuccessStep amount={effectiveAmount ?? 0} onClose={handleClose} />
            )}

            {step === 'paypal' && (
              <PayPalStep
                amount={effectiveAmount ?? 0}
                onBack={() => navigateTo('select', 'back')}
                onSuccess={() => navigateTo('success', 'forward')}
                onError={handleError}
              />
            )}

            {step === 'select' && (
              <SelectAmountStep
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                effectiveAmount={effectiveAmount}
                errorMessage={errorMessage}
                onAmountSelect={handleAmountSelect}
                onCustomChange={handleCustomChange}
                onDonate={handleDonate}
              />
            )}
          </div>
        </div>

        <ImagePanel />
      </div>
    </div>
  );
}

// ─── Layout sub-components ────────────────────────────────────────────────────

function ModalHeader() {
  return (
    <div className="flex justify-center">
      <img
        src="/home-assets/logo-gold.png"
        alt="Andean Roots Initiative"
        className="h-15 w-auto object-contain"
      />
    </div>
  );
}

function ImagePanel() {
  return (
    <div className="relative hidden sm:block sm:w-[80%]">
      <img
        src="/donate-assets/donate-main-img.png"
        alt="Comunidad andina"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-8">
        <p className="heading-md-sb leading-tight text-white">Tu apoyo transforma vidas andinas</p>
      </div>
    </div>
  );
}
