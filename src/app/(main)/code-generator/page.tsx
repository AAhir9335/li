
import { CodeGeneratorForm } from '@/components/dashboard/code-generator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

export default function CodeGeneratorPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Code className="h-8 w-8" />
          </div>
          <CardTitle>AI Code Generator</CardTitle>
          <CardDescription>
            Select a product and platform to generate a license integration script.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeGeneratorForm />
        </CardContent>
      </Card>
    </div>
  );
}
