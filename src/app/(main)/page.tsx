import { KeyRound, CheckCircle, XCircle, AlertCircle, Plus, Download } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { LicenseTable } from '@/components/dashboard/license-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AddLicenseDialog } from '@/components/dashboard/add-license-dialog';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Licenses" value="1,250" icon={KeyRound} />
        <StatCard title="Active Licenses" value="980" icon={CheckCircle} />
        <StatCard title="Expired Licenses" value="210" icon={XCircle} />
        <StatCard title="Revoked Licenses" value="60" icon={AlertCircle} />
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>License Management</CardTitle>
            <CardDescription>
              View, manage, and track all your product licenses.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <AddLicenseDialog />
          </div>
        </CardHeader>
        <CardContent>
          <LicenseTable />
        </CardContent>
      </Card>
    </div>
  );
}
