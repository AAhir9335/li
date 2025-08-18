export type LicenseStatus = 'active' | 'inactive' | 'expired' | 'revoked';

export type License = {
  id: string;
  product: string;
  status: LicenseStatus;
  activations: {
    used: number;
    limit: number;
  };
  domains: string[];
  expiresAt: string; // Using string for simplicity, can be 'Lifetime' or a date
};
