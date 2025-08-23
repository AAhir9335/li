
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const products = [
  {
    name: 'Pro Widgets',
    slug: 'pro-widgets',
    licenses: 120,
    status: 'Active',
  },
  {
    name: 'Super Forms',
    slug: 'super-forms',
    licenses: 85,
    status: 'Active',
  },
  {
    name: 'Mega Slider',
    slug: 'mega-slider',
    licenses: 230,
    status: 'Inactive',
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your products.</p>
        </div>
        <Link href="/products/add">
          <Button>
            <Plus className="mr-2" /> Add New Product
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Total Licenses</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.slug}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.slug}</TableCell>
                  <TableCell>{product.licenses}</TableCell>
                  <TableCell>{product.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
