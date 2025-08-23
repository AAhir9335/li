
'use server';

import { detectNulledLicense, DetectNulledLicenseInput, DetectNulledLicenseOutput } from '@/ai/flows/detect-nulled-licenses';
import { generateLicenseScript, GenerateLicenseScriptInput, GenerateLicenseScriptOutput } from '@/ai/flows/generate-license-script';
import { z } from 'zod';

const nulledFormSchema = z.object({
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

  const validatedFields = nulledFormSchema.safeParse(input);

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


const generateScriptFormSchema = z.object({
  productName: z.string(),
  productId: z.coerce.number(),
  productSlug: z.string(),
  platform: z.string(),
});

type GenerateScriptResult = {
  success: true;
  data: GenerateLicenseScriptOutput;
} | {
  success: false;
  error: string;
};

export async function generateLicenseScriptAction(
  prevState: any,
  formData: FormData
): Promise<GenerateScriptResult> {
   const input = {
    productName: formData.get('productName'),
    productId: formData.get('productId'),
    productSlug: formData.get('productSlug'),
    platform: formData.get('platform'),
  };

  const validatedFields = generateScriptFormSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data for script generation.',
    };
  }
  
  try {
    const result = await generateLicenseScript(validatedFields.data as GenerateLicenseScriptInput);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating license script:', error);
    return { success: false, error: 'An unexpected error occurred while generating the script.' };
  }
}
