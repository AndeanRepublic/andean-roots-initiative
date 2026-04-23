import { cn } from '../../cn';
import { PRESET_AMOUNTS } from './types';

interface SelectAmountStepProps {
  selectedAmount: number | null;
  customAmount: string;
  effectiveAmount: number | null;
  errorMessage: string;
  onAmountSelect: (amount: number) => void;
  onCustomChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDonate: () => void;
}

export function SelectAmountStep({
  selectedAmount,
  customAmount,
  effectiveAmount,
  errorMessage,
  onAmountSelect,
  onCustomChange,
  onDonate,
}: SelectAmountStepProps) {
  const hasValidAmount = effectiveAmount !== null && effectiveAmount > 0;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-4">
        <p className="text-gray text-sm font-semibold tracking-wide uppercase">
          Elige un monto para donar
        </p>

        <AmountGrid selectedAmount={selectedAmount} onSelect={onAmountSelect} />

        <CustomAmountInput value={customAmount} onChange={onCustomChange} />
      </div>

      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}

      <button
        onClick={onDonate}
        disabled={!hasValidAmount}
        className={cn(
          'w-full cursor-pointer rounded-full py-3.5 text-sm font-semibold transition-all',
          hasValidAmount
            ? 'bg-main text-white hover:opacity-90'
            : 'text-gray cursor-not-allowed bg-[#e5e5e3]',
        )}
      >
        {hasValidAmount ? `Donar $${effectiveAmount?.toFixed(2)}` : 'Elige un monto'}
      </button>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function AmountGrid({
  selectedAmount,
  onSelect,
}: {
  selectedAmount: number | null;
  onSelect: (amount: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {PRESET_AMOUNTS.map((amount) => (
        <button
          key={amount}
          onClick={() => onSelect(amount)}
          className={cn(
            'cursor-pointer rounded-lg border py-3 text-base font-semibold transition-all',
            selectedAmount === amount
              ? 'border-main bg-main text-white'
              : 'bg-light hover:border-main border-[#e5e5e3] text-black',
          )}
        >
          ${amount}
        </button>
      ))}
    </div>
  );
}

function CustomAmountInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-light focus-within:border-main flex items-center gap-2 rounded-lg border border-[#e5e5e3] px-4 py-3">
      <span className="text-gray text-sm">USD</span>
      <span className="text-sm font-semibold text-black">$</span>
      <input
        type="number"
        min="1"
        step="1"
        placeholder="Otro monto"
        value={value}
        onChange={onChange}
        className="placeholder:text-gray flex-1 bg-transparent text-sm text-black outline-none"
      />
    </div>
  );
}
