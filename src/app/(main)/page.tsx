import {
  ShieldCheck,
  DollarSign,
  Ban,
  Clock,
  Plus,
  Package,
  LineChart,
  Download,
  Database,
  Mail,
  KeyRound,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AddLicenseDialog } from '@/components/dashboard/add-license-dialog';

const StatCard = ({ icon: Icon, title, value, change, iconBgColor, changeColor }) => (
  <Card>
    <CardContent className="p-4 flex items-center justify-between">
      <div>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-3xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor || 'text-muted-foreground'}`}>{change}</p>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconBgColor}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </CardContent>
  </Card>
);

const QuickActionButton = ({ icon: Icon, label, variant = "ghost" }) => (
  <Button variant={variant} className={`w-full justify-start p-4 h-auto text-base ${variant === 'default' ? '' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
    <Icon className="mr-3 h-5 w-5" />
    {label}
  </Button>
);

const SystemHealthItem = ({ icon: Icon, title, status, color }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-muted-foreground">{title}</span>
      </div>
      <span className={`font-medium ${color}`}>{status}</span>
    </div>
);


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your license management system</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Active Licenses" 
          value="0" 
          change="~ +12% from last month" 
          icon={ShieldCheck} 
          iconBgColor="bg-green-500"
          changeColor="text-green-600"
        />
        <StatCard 
          title="Total Revenue" 
          value="$0" 
          change="~ +8% from last month" 
          icon={DollarSign} 
          iconBgColor="bg-blue-500"
          changeColor="text-green-600"
        />
        <StatCard 
          title="Blocked Domains" 
          value="0" 
          change="~ 3 new this week" 
          icon={Ban} 
          iconBgColor="bg-red-500"
          changeColor="text-red-600"
        />
        <StatCard 
          title="Expiring Soon" 
          value="0" 
          change="~ Within 30 days" 
          icon={Clock} 
          iconBgColor="bg-orange-500"
          changeColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <AddLicenseDialog />
                <QuickActionButton icon={Package} label="Add Product" />
                <QuickActionButton icon={LineChart} label="View Reports" />
                <QuickActionButton icon={Download} label="Export Data" />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No recent activity
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                No products available
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <SystemHealthItem icon={CheckCircle} title="API Status" status="Online" color="text-green-500" />
            <SystemHealthItem icon={CheckCircle} title="Database" status="Connected" color="text-green-500" />
            <SystemHealthItem icon={AlertCircle} title="Email Service" status="Limited" color="text-orange-500" />
            <SystemHealthItem icon={CheckCircle} title="License Validation" status="Active" color="text-green-500" />
        </CardContent>
        <CardFooter>
            <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">System Update Available</AlertTitle>
                <AlertDescription className="flex items-center justify-between text-blue-700">
                <span>Version 1.1.0 includes security improvements and new features.</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Update Now</Button>
                </AlertDescription>
            </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}
