
import Link from 'next/link';
import { Plus, Edit, Trash2, Cog } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

const products = [
  {
    id: 1,
    name: 'Pro Widgets',
    slug: 'pro-widgets',
    licenses: 120,
    status: 'Active',
    entryDate: 'May 7, 2019 5:58 pm'
  },
  {
    id: 2,
    name: 'Super Forms',
    slug: 'super-forms',
    licenses: 85,
    status: 'Active',
    entryDate: 'May 7, 2019 6:03 pm'
  },
  {
    id: 3,
    name: 'Mega Slider',
    slug: 'mega-slider',
    licenses: 230,
    status: 'Inactive',
    entryDate: 'May 9, 2019 9:13 pm'
  },
   {
    id: 4,
    name: 'Another Product',
    slug: 'another-product',
    licenses: 50,
    status: 'Active',
    entryDate: 'May 10, 2019 10:31 am'
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
                <TableHead>Entry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name} (ID: {product.id})</TableCell>
                  <TableCell>{product.entryDate}</TableCell>
                  <TableCell>
                     <Badge variant={product.status === 'Active' ? 'default' : 'destructive'} className={product.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                      <Edit className="mr-1 h-4 w-4" /> Edit
                    </Button>
                     <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 hover:text-white">
                      <Cog className="mr-1 h-4 w-4" /> Generate License Script
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
