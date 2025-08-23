
import { AddProductForm } from '@/components/products/add-product-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-4xl">
       <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">Fill in the details below to create a new product.</p>
        </div>
      <Card>
        <CardContent className="p-6">
          <AddProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
