'use server';
/**
 * @fileOverview AI-powered license validation to detect potentially unauthorized licenses.
 *
 * - detectNulledLicense - A function to analyze license validation requests.
 * - DetectNulledLicenseInput - The input type for the detectNulledLicense function.
 * - DetectNulledLicenseOutput - The return type for the detectNulledLicense function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectNulledLicenseInputSchema = z.object({
  licenseKey: z.string().describe('The license key to validate.'),
  domain: z.string().describe('The domain where the license is being activated.'),
  productName: z.string().describe('The name of the product being licensed.'),
  requestDetails: z
    .string()
    .optional()
    .describe('Optional details about the validation request.'),
});
export type DetectNulledLicenseInput = z.infer<typeof DetectNulledLicenseInputSchema>;

const DetectNulledLicenseOutputSchema = z.object({
  isNulled: z
    .boolean()
    .describe(
      'True if the license is likely nulled/unauthorized, false otherwise.'
    ),
  confidence: z
    .number()
    .describe(
      'A value between 0 and 1 indicating the confidence level of the nulled determination.'
    ),
  reason: z.string().describe('The reasoning behind the nulled determination.'),
});
export type DetectNulledLicenseOutput = z.infer<typeof DetectNulledLicenseOutputSchema>;

export async function detectNulledLicense(input: DetectNulledLicenseInput): Promise<DetectNulledLicenseOutput> {
  return detectNulledLicenseFlow(input);
}

const detectNulledLicensePrompt = ai.definePrompt({
  name: 'detectNulledLicensePrompt',
  input: {schema: DetectNulledLicenseInputSchema},
  output: {schema: DetectNulledLicenseOutputSchema},
  prompt: `You are an expert in detecting software license piracy and unauthorized license keys. Analyze the provided license validation request details to determine if the license is potentially a "nulled" or unauthorized version.

License Key: {{{licenseKey}}}
Domain: {{{domain}}}
Product Name: {{{productName}}}
Request Details: {{{requestDetails}}}

Consider factors such as suspicious patterns in the license key format, the domain's reputation, and any unusual request details. Provide a confidence score (0 to 1) indicating the certainty of your assessment.

Is this license likely nulled/unauthorized? Provide a confidence score between 0 and 1.
Reason your decision.

Ensure that the output is a JSON object that conforms to the schema. The \"reason\" field should contain a concise explanation for the determination.
`,
});

const detectNulledLicenseFlow = ai.defineFlow(
  {
    name: 'detectNulledLicenseFlow',
    inputSchema: DetectNulledLicenseInputSchema,
    outputSchema: DetectNulledLicenseOutputSchema,
  },
  async input => {
    const {output} = await detectNulledLicensePrompt(input);
    return output!;
  }
);
