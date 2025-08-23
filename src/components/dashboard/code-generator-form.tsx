
'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useActionState, useState } from 'react';
import { z } from 'zod';
import { Cog, Copy, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateLicenseScriptAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

const products = [
  { id: 1, name: 'Pro Widgets', slug: 'pro-widgets' },
  { id: 2, name: 'Super Forms', slug: 'super-forms' },
  { id: 3, name: 'Mega Slider', slug: 'mega-slider' },
  { id: 4, name: 'Another Product', slug: 'another-product' },
  { id: 5, name: 'Cool Plugin', slug: 'cool-plugin' },
];

const formSchema = z.object({
  productId: z.coerce.number({ required_error: 'Please select a product.' }),
  platform: z.string().min(1, 'Please select a platform.'),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Cog className="mr-2 h-4 w-4" />}
      Generate Script
    </Button>
  );
}

export function CodeGeneratorForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(generateLicenseScriptAction, null);
  const [generatedScript, setGeneratedScript] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (state?.success === false && state.error) {
      toast({
        variant: "destructive",
        title: "Script Generation Failed",
        description: state.error,
      });
    }
    if (state?.success === true && state.data) {
      setGeneratedScript(state.data.script);
      toast({
        title: "Script Generated",
        description: "Your license integration script is ready.",
      });
    }
  }, [state, toast]);

  const handleCopyToClipboard = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      toast({
        title: "Copied to Clipboard",
        description: "The license script has been copied.",
      });
    }
  };
  
  const selectedProductId = form.watch('productId');
  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form 
          action={(formData) => {
            if (selectedProduct) {
              formData.set('productName', selectedProduct.name);
              formData.set('productSlug', selectedProduct.slug);
            }
            formAction(formData);
          }} 
          className="space-y-6"
        >
           <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wordpress_plugin">WordPress Plugin</SelectItem>
                    <SelectItem value="wordpress_theme">WordPress Theme</SelectItem>
                    <SelectItem value="php_app">Generic PHP Application</SelectItem>
                    <SelectItem value="csharp_app">C#/.NET Application</SelectItem>
                    <SelectItem value="vb_net_app">VB.NET Application</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton />
        </form>
      </Form>

      {generatedScript && (
        <div className="relative mt-4">
          <div className="flex justify-between items-center">
             <FormLabel>Generated Script</FormLabel>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleCopyToClipboard}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
          <pre className="mt-2 h-80 overflow-auto rounded-md border bg-muted p-4 font-code text-sm">
            <code>
              {generatedScript}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
