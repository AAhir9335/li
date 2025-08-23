
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const formSchema = z.object({
  productName: z.string().min(1, 'Product name is required.'),
  productSlug: z.string().min(1, 'Product base/slug is required.'),
  status: z.boolean().default(true),
  requestEncryption: z.string().optional(),
  autoGenerateEncryption: z.boolean().default(false),
  renewLink: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  checkExpiry: z.boolean().default(false),
  encryptResponse: z.boolean().default(false),
});

export function AddProductForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productSlug: '',
      status: true,
      requestEncryption: '',
      autoGenerateEncryption: true,
      renewLink: '',
      checkExpiry: false,
      encryptResponse: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would handle form submission to your backend here.
    console.log('New product created:', values);
    toast({
      title: 'Product Created',
      description: `The product "${values.productName}" has been successfully created.`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requestEncryption"
              render={({ field }) => (
                <FormItem>
                   <div className="flex items-center justify-between">
                    <FormLabel>Request Encryption</FormLabel>
                     <FormField
                      control={form.control}
                      name="autoGenerateEncryption"
                      render={({ field: switchField }) => (
                        <FormItem className="flex items-center gap-2 space-y-0">
                           <FormLabel className="text-sm font-normal text-muted-foreground">Auto Generate?</FormLabel>
                          <FormControl>
                              <Switch
                                checked={switchField.value}
                                onCheckedChange={switchField.onChange}
                              />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormControl>
                    <Input placeholder="Request Encryption" {...field} />
                  </FormControl>
                   <FormDescription className="text-green-600">
                    ! By this key all active/deactive request between this license server and your app will be encrypted.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="checkExpiry"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Check License & Support Expiry On Update
                    </FormLabel>
                    <FormDescription>
                      If you enabled it, license & support expiry date need to be valid on update checking.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8">
             <div className="flex justify-between items-start">
              <div className="flex-1">
                 <FormField
                  control={form.control}
                  name="productSlug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Base/Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Base" {...field} />
                      </FormControl>
                      <FormDescription>
                        (For WordPress, it will be slug Name of Plugin or Theme)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="text-center ml-8">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                       <div className="flex items-center pt-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                       </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="renewLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Renew Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Renew Link" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your product will show a button for renew License or support, if you enter a link here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="encryptResponse"
              render={({ field }) => (
                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                     Encrypt Update Response
                    </FormLabel>
                     <FormDescription>
                      If you enabled it, it will encrypt update response to protect publicly distribution.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-8">
            <Button type="submit">
                <Save /> Save
              </Button>
            <Button type="button" variant="destructive" asChild>
              <Link href="/products"><X /> Cancel</Link>
            </Button>
        </div>
      </form>
    </Form>
  );
}
