import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface PayPalStepProps {
  amount: number;
  onBack: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const BUTTON_STYLE = { layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' } as const;

export function PayPalStep({ amount, onBack, onSuccess, onError }: PayPalStepProps) {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <div className="flex flex-1 flex-col gap-4">
      <button
        onClick={onBack}
        className="text-gray hover:text-main flex cursor-pointer items-center gap-1.5 text-sm transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Cambiar monto
      </button>

      <div className="flex items-center justify-between rounded-xl bg-light px-5 py-4">
        <span className="text-sm text-gray">Total a donar</span>
        <span className="font-skrawk-serif text-2xl text-main">${amount.toFixed(2)}</span>
      </div>

      {isPending ? (
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="border-main h-6 w-6 animate-spin rounded-full border-2 border-t-transparent" />
        </div>
      ) : (
        <PayPalButtons
          style={BUTTON_STYLE}
          createOrder={(_data, actions) =>
            actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: { currency_code: 'USD', value: amount.toFixed(2) },
                  description: 'Donación a Andean Roots Initiative',
                },
              ],
            })
          }
          onApprove={async (_data, actions) => {
            await actions.order?.capture();
            onSuccess();
          }}
          onError={() => onError('Hubo un error con el pago. Por favor inténtalo de nuevo.')}
        />
      )}
    </div>
  );
}
