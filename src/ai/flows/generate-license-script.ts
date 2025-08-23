
'use server';
/**
 * @fileOverview AI-powered license script generator.
 *
 * - generateLicenseScript - A function to generate a license integration script for a given platform.
 * - GenerateLicenseScriptInput - The input type for the function.
 * - GenerateLicenseScriptOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLicenseScriptInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productId: z.number().describe('The unique ID of the product.'),
  productSlug: z.string().describe('The slug of the product (e.g., for WordPress).'),
  platform: z.string().describe('The target platform, e.g., "WordPress Plugin", "PHP Application", "C# Application".'),
});
export type GenerateLicenseScriptInput = z.infer<typeof GenerateLicenseScriptInputSchema>;

const GenerateLicenseScriptOutputSchema = z.object({
  script: z.string().describe('The generated code snippet for license integration.'),
});
export type GenerateLicenseScriptOutput = z.infer<typeof GenerateLicenseScriptOutputSchema>;


export async function generateLicenseScript(input: GenerateLicenseScriptInput): Promise<GenerateLicenseScriptOutput> {
  return generateLicenseScriptFlow(input);
}


const generateLicenseScriptPrompt = ai.definePrompt({
  name: 'generateLicenseScriptPrompt',
  input: {schema: GenerateLicenseScriptInputSchema},
  output: {schema: GenerateLicenseScriptOutputSchema},
  prompt: `You are an expert software developer specializing in creating license integration scripts for various platforms. Your task is to generate a code snippet that a developer can use to integrate their product with a license validation server.

You will be given the product details and the target platform. The generated script should be a complete, copy-paste-ready example.

**Product Details:**
- Name: {{{productName}}}
- ID: {{{productId}}}
- Slug: {{{productSlug}}}

**Target Platform:** {{{platform}}}

**Requirements for the generated script:**
1.  **Server Endpoint:** All API calls for license activation/validation should be directed to \`https://YOUR_LICENSE_SERVER_URL/api/v1/validate\`.
2.  **Product Identification:** The script must send the product's ID or slug to the server.
3.  **License Key Handling:** The script should show how the end-user's license key is collected and sent to the server.
4.  **Error Handling:** Include basic error handling for API requests (e.g., network errors, invalid license response).
5.  **Functionality Lock:** The script must demonstrate how to lock or unlock the product's functionality based on the license validation response.
6.  **Code Comments:** Add clear and concise comments to explain each part of the code.
7.  **Platform-Specific Best Practices:** Use standard practices and functions for the specified platform (e.g., for WordPress, use the Options API for storing the license key and transients for caching validation results).
8.  **Security:** Remind the user in the comments not to expose sensitive information on the client-side.

Generate the script now. Ensure the output is a JSON object with a single "script" field containing the code as a string.
`,
});

const generateLicenseScriptFlow = ai.defineFlow(
  {
    name: 'generateLicenseScriptFlow',
    inputSchema: GenerateLicenseScriptInputSchema,
    outputSchema: GenerateLicenseScriptOutputSchema,
  },
  async input => {
    const {output} = await generateLicenseScriptPrompt(input);
    return output!;
  }
);
