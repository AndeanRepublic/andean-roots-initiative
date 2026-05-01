import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { DonationForm } from './DonationForm';
import { BASE_PAYPAL_OPTIONS } from './types';

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const open = () => setIsOpen(true);
    document.addEventListener('open-donation-modal', open);
    return () => document.removeEventListener('open-donation-modal', open);
  }, []);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  if (!isOpen || !portalRoot) return null;

  return createPortal(
    <PayPalScriptProvider options={{ ...BASE_PAYPAL_OPTIONS, intent: 'capture' }}>
      <DonationForm onClose={close} />
    </PayPalScriptProvider>,
    portalRoot,
  );
}
