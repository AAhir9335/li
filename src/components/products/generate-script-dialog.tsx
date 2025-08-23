
'use client';

import { useState, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Cog, Copy, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateLicenseScriptAction } from '@/lib/actions';
import { Label } from '../ui/label';

type Product = {
  id: number;
  name: string;
  slug: string;
};

interface GenerateScriptDialogProps {
  product: Product;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Cog className="mr-2 h-4 w-4" />}
      Generate Script
    </Button>
  );
}

export function GenerateScriptDialog({ product }: GenerateScriptDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [state, formAction] = useActionState(generateLicenseScriptAction, null);
  const [generatedScript, setGeneratedScript] = useState('');

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
    }
  }, [state, toast]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied to Clipboard",
      description: "The license script has been copied to your clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 hover:text-white">
          <Cog className="mr-1 h-4 w-4" /> Generate License Script
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Generate License Script for "{product.name}"</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select your platform to generate a tailored license integration script. This script will handle license validation against this server.
          </p>
          <form action={formAction} className="flex items-end gap-2">
            <input type="hidden" name="productName" value={product.name} />
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="productSlug" value={product.slug} />

            <div className="flex-1">
              <Label htmlFor="platform">Platform</Label>
              <Select name="platform" defaultValue="wordpress_plugin">
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wordpress_plugin">WordPress Plugin</SelectItem>
                  <SelectItem value="wordpress_theme">WordPress Theme</SelectItem>
                  <SelectItem value="php_app">Generic PHP Application</SelectItem>
                  <SelectItem value="csharp_app">C#/.NET Application</SelectItem>
                  <SelectItem value="vb_net_app">VB.NET Application</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SubmitButton />
          </form>

          {generatedScript && (
            <div className="relative mt-4">
              <Label>Generated Script</Label>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-7 h-7 w-7"
                onClick={handleCopyToClipboard}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
              <pre className="mt-2 h-80 overflow-auto rounded-md border bg-muted p-4 font-code text-sm">
                <code>
                  {generatedScript}
                </code>
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
