import { NulledDetectorForm } from '@/components/dashboard/nulled-detector-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

export default function NulledDetectorPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <CardTitle>AI Nulled License Detector</CardTitle>
          <CardDescription>
            Submit license activation details to analyze for signs of piracy or
            unauthorized use. Our AI will provide a confidence score and reasoning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NulledDetectorForm />
        </CardContent>
      </Card>
    </div>
  );
}
