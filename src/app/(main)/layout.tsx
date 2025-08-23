
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Tag,
  Package,
  Users,
  LineChart,
  Mail,
  ShoppingCart,
  Download,
  Settings,
  UserCircle,
  ShieldAlert
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/logo';
import { Badge } from '@/components/ui/badge';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '#',
      label: 'Licenses',
      icon: Tag,
      badge: '248',
    },
    {
      href: '/products',
      label: 'Products',
      icon: Package,
      badge: '12',
    },
    {
      href: '#',
      label: 'Customers',
      icon: Users,
      badge: '156',
    },
    {
      href: '#',
      label: 'Reports',
      icon: LineChart,
    },
    {
      href: '/nulled-detector',
      label: 'AI Nulled Detector',
      icon: ShieldAlert,
    },
    {
      href: '#',
      label: 'Email Templates',
      icon: Mail,
    },
    {
      href: '#',
      label: 'Integrations',
      icon: ShoppingCart,
    },
    {
      href: '#',
      label: 'Updates',
      icon: Download,
    },
    {
      href: '#',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserCircle className="h-6 w-6" />
                   <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
