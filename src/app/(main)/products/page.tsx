
import Link from 'next/link';
import { Plus, Edit, Trash2, Cog, Search, X, Download, RefreshCw } from 'lucide-react';
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
import { GenerateScriptDialog } from '@/components/products/generate-script-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';

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
    status: 'Active',
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
  {
    id: 5,
    name: 'Cool Plugin',
    slug: 'cool-plugin',
    licenses: 150,
    status: 'Inactive',
    entryDate: 'May 10, 2019 12:16 pm'
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                    <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Property" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Product Name</SelectItem>
                        <SelectItem value="date">Entry Date</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                    </SelectContent>
                    </Select>
                    <Input placeholder="Search..." className="w-auto" />
                    <Button variant="outline"><Search className="mr-2 h-4 w-4" /> Search</Button>
                    <Button variant="destructive"><X className="mr-2 h-4 w-4" /> Reset</Button>
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                    <Link href="/products/add">
                        <Button className="bg-blue-500 text-white hover:bg-blue-600">
                            <Plus className="mr-2" /> Add New
                        </Button>
                    </Link>
                    <Button className="bg-green-500 text-white hover:bg-green-600">
                        <Download className="mr-2" /> Download CSV
                    </Button>
                    <Button className="bg-blue-600 text-white hover:bg-blue-700">
                        <RefreshCw className="mr-2" /> Reload
                    </Button>
                </div>
            </div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]"><Cog /></TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Entry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {products.map((product, index) => (
                    <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                        {product.name} <span className="text-green-600">(ID: {product.id})</span>
                    </TableCell>
                    <TableCell>{product.entryDate}</TableCell>
                    <TableCell>
                        <Badge variant={product.status === 'Active' ? 'default' : 'destructive'} className={product.status === 'Active' ? 'bg-transparent text-green-600 border-green-600' : 'bg-transparent text-red-600 border-red-600'}>
                        {product.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-center space-x-2">
                        <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                        <Edit className="mr-1 h-4 w-4" /> Edit
                        </Button>
                        <GenerateScriptDialog product={product} />
                        <Button variant="destructive" size="sm">
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
