'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { AlertTriangle, CheckCircle, Loader2, ShieldCheck, ShieldX } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { checkNulledLicenseAction } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  licenseKey: z.string().min(1, 'License key is required.'),
  domain: z.string().min(1, 'Domain is required.'),
  productName: z.string().min(1, 'Product name is required.'),
  requestDetails: z.string().optional(),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
      Analyze License
    </Button>
  );
}

export function NulledDetectorForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(checkNulledLicenseAction, null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseKey: 'GPL-NVATO-F837-1A2B-CLONE',
      domain: 'warez-forum.io',
      productName: 'Pro Widgets',
      requestDetails: 'User agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    },
  });
  
  useEffect(() => {
    if (state?.success === false && state.error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: state.error,
      });
    }
  }, [state, toast]);


  return (
    <div>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <FormField
            control={form.control}
            name="licenseKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Key</FormLabel>
                <FormControl>
                  <Input placeholder="Enter license key" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activation Domain</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requestDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Details (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Include any extra details like IP, user agent, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton />
        </form>
      </Form>

      {state?.success === true && state.data && (
        <Card className="mt-8 bg-background">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {state.data.isNulled ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>High Risk of Nulled License</AlertTitle>
                <AlertDescription>This license activation shows strong indicators of being unauthorized.</AlertDescription>
              </Alert>
            ) : (
               <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>License Appears Legitimate</AlertTitle>
                <AlertDescription>This license activation does not show common indicators of being unauthorized.</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Confidence Score</span>
                <span>{(state.data.confidence * 100).toFixed(0)}%</span>
              </div>
              <Progress value={state.data.confidence * 100} />
            </div>

            <div>
              <h4 className="font-semibold">Reasoning</h4>
              <p className="text-sm text-muted-foreground">{state.data.reason}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
