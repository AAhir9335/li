import type { License } from '@/lib/types';

export const licenses: License[] = [
  {
    id: 'LS-84B2A1',
    product: 'Pro Widgets',
    status: 'active',
    activations: {
      used: 1,
      limit: 1,
    },
    domains: ['acme.com'],
    expiresAt: '2025-06-15',
  },
  {
    id: 'LS-C3D7E5',
    product: 'Super Forms',
    status: 'active',
    activations: {
      used: 3,
      limit: 5,
    },
    domains: ['example.org', 'sample.net', 'demo.co'],
    expiresAt: '2024-12-31',
  },
  {
    id: 'LS-F9G1H2',
    product: 'Mega Slider',
    status: 'inactive',
    activations: {
      used: 0,
      limit: 1,
    },
    domains: [],
    expiresAt: 'Lifetime',
  },
  {
    id: 'LS-J6K4L8',
    product: 'Pro Widgets',
    status: 'expired',
    activations: {
      used: 1,
      limit: 1,
    },
    domains: ['old-site.com'],
    expiresAt: '2023-01-20',
  },
  {
    id: 'LS-M5N3P7',
    product: 'Ultimate CRM',
    status: 'revoked',
    activations: {
      used: 2,
      limit: 10,
    },
    domains: ['clienta.com', 'clientb.com'],
    expiresAt: '2026-03-10',
  },
  {
    id: 'LS-Q9R2S4',
    product: 'Super Forms',
    status: 'active',
    activations: {
      used: 5,
      limit: 5,
    },
    domains: ['site1.io', 'site2.io', 'site3.io', 'site4.io', 'site5.io'],
    expiresAt: '2025-08-01',
  },
  {
    id: 'LS-T1U6V8',
    product: 'Mega Slider',
    status: 'active',
    activations: {
      used: 0,
      limit: 1,
    },
    domains: [],
    expiresAt: 'Lifetime',
  },
  {
    id: 'LS-W7X3Y9',
    product: 'Pro Widgets',
    status: 'inactive',
    activations: {
      used: 0,
      limit: 3,
    },
    domains: [],
    expiresAt: '2025-02-28',
  },
];
