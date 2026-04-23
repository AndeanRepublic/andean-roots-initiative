export type Step = 'select' | 'paypal' | 'success';

export const PRESET_AMOUNTS = [25, 50, 100, 250] as const;

export const CLIENT_ID = import.meta.env.PUBLIC_PAYPAL_CLIENT_ID as string;

export const BASE_PAYPAL_OPTIONS = {
  clientId: CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
} as const;
