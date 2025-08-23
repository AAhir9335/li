
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  licenseTitle: z.string().min(1, 'License title is required.'),
  enableExpiry: z.boolean().default(false),
  expiryDays: z.coerce.number().optional(),
  support: z.enum(['none', 'unlimited', 'days']).default('none'),
  supportDays: z.coerce.number().optional(),
  extraParam: z.string().optional(),
  maxDomain: z.coerce.number().min(0, 'Max domains must be 0 or more.'),
  verificationRequired: z.string().optional(),
  status: z.boolean().default(true),
});

export function AddLicenseDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseTitle: 'Annual',
      enableExpiry: true,
      expiryDays: 365,
      support: 'days',
      supportDays: 365,
      extraParam: '',
      maxDomain: 1,
      verificationRequired: '',
      status: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would handle form submission to your backend here.
    console.log('New license type created:', values);
    toast({
      title: 'License Type Created',
      description: `A new license type "${values.licenseTitle}" has been successfully created.`,
    });
    setOpen(false);
    form.reset();
  };
  
  const enableExpiry = form.watch('enableExpiry');
  const support = form.watch('support');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start p-4 h-auto text-base">
          <Plus className="mr-3 h-5 w-5" />
          Create New License
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add License Type</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="licenseTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enableExpiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enable Expiry & Days</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormField
                        control={form.control}
                        name="expiryDays"
                        render={({ field: expiryField }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input type="number" {...expiryField} disabled={!enableExpiry} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="support"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Has Support & Days</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">No Support</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="unlimited" />
                          </FormControl>
                          <FormLabel className="font-normal">Unlimited</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="days" />
                          </FormControl>
                          <FormLabel className="font-normal">Day Interval</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormField
                      control={form.control}
                      name="supportDays"
                      render={({ field: supportDaysField }) => (
                        <FormItem className="w-48">
                          <FormControl>
                            <Input type="number" {...supportDaysField} disabled={support !== 'days'} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extraParam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Param</FormLabel>
                  <FormControl>
                    <Input placeholder="Extra Param" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="maxDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Domain</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verificationRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Required</FormLabel>
                    <FormControl>
                      <Input placeholder="Verification Required" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
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
            
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="destructive">
                  <X /> Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                <Save /> Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
