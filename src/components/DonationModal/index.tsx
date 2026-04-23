import { useState, useEffect, useCallback } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { DonationForm } from './DonationForm';
import { BASE_PAYPAL_OPTIONS } from './types';

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const open = () => setIsOpen(true);
    document.addEventListener('open-donation-modal', open);
    return () => document.removeEventListener('open-donation-modal', open);
  }, []);

  if (!isOpen) return null;

  return (
    <PayPalScriptProvider options={{ ...BASE_PAYPAL_OPTIONS, intent: 'capture' }}>
      <DonationForm onClose={close} />
    </PayPalScriptProvider>
  );
}
