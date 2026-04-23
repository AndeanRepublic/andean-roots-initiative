interface SuccessStepProps {
  amount: number;
  onClose: () => void;
}

export function SuccessStep({ amount, onClose }: SuccessStepProps) {
  return (
    <div className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-4 text-center">
      <div className="bg-light flex h-16 w-16 items-center justify-center rounded-full">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 16l7 7L26 9"
            stroke="#9b7627"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="font-nunito-sans text-xl font-semibold text-black">
        ¡Gracias por tu donación!
      </h2>

      <p className="text-gray text-sm">
        Tu contribución de <span className="text-main font-semibold">${amount.toFixed(2)} USD</span>{' '}
        ayuda a transformar comunidades andinas.
      </p>

      <button
        onClick={onClose}
        className="bg-main mt-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Cerrar
      </button>
    </div>
  );
}
