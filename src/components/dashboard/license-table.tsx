'use client';

import { MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { licenses } from '@/lib/data';
import type { License, LicenseStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const statusStyles: Record<LicenseStatus, string> = {
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  expired: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  revoked: 'bg-red-100 text-red-800 border-red-200',
};

export function LicenseTable() {
  const handleExport = (format: 'csv' | 'json') => {
    let dataStr: string;
    let fileName: string;
    
    if (format === 'json') {
      dataStr = JSON.stringify(licenses, null, 2);
      fileName = 'licenses.json';
    } else {
      const headers = ['ID', 'Product', 'Status', 'Activations Used', 'Activation Limit', 'Domains', 'Expires At'];
      const rows = licenses.map(l => [l.id, l.product, l.status, l.activations.used, l.activations.limit, l.domains.join(', '), l.expiresAt]);
      dataStr = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      fileName = 'licenses.csv';
    }

    const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>License Key</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Activations</TableHead>
          <TableHead>Domains</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.map((license) => (
          <TableRow key={license.id}>
            <TableCell className="font-medium font-code">{license.id}</TableCell>
            <TableCell>{license.product}</TableCell>
            <TableCell>
              <Badge variant="outline" className={cn('capitalize', statusStyles[license.status])}>
                {license.status}
              </Badge>
            </TableCell>
            <TableCell>
              {license.activations.used} / {license.activations.limit}
            </TableCell>
            <TableCell className="max-w-[200px] truncate">
              {license.domains.join(', ') || '-'}
            </TableCell>
            <TableCell>{license.expiresAt}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Revoke</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
