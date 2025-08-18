'use server';

import { detectNulledLicense, DetectNulledLicenseInput, DetectNulledLicenseOutput } from '@/ai/flows/detect-nulled-licenses';
import { z } from 'zod';

const formSchema = z.object({
  licenseKey: z.string().min(1, 'License key is required.'),
  domain: z.string().min(1, 'Domain is required.'),
  productName: z.string().min(1, 'Product name is required.'),
  requestDetails: z.string().optional(),
});

type NulledLicenseCheckResult = {
  success: true;
  data: DetectNulledLicenseOutput;
} | {
  success: false;
  error: string;
};

export async function checkNulledLicenseAction(
  prevState: any,
  formData: FormData
): Promise<NulledLicenseCheckResult> {
  const input = {
    licenseKey: formData.get('licenseKey'),
    domain: formData.get('domain'),
    productName: formData.get('productName'),
    requestDetails: formData.get('requestDetails'),
  };

  const validatedFields = formSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    const result = await detectNulledLicense(validatedFields.data as DetectNulledLicenseInput);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error detecting nulled license:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
