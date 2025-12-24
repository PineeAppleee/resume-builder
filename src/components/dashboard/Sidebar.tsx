'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Settings,
    LogOut,
    PlusCircle,
} from 'lucide-react';

const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Builder', href: '/resume-builder', icon: FileText },
    { name: 'Job Tracker', href: '/tracker', icon: Briefcase },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    };

    return (
        <div className="flex flex-col h-full border-r border-border bg-card">
            <div className="p-6 border-b border-border">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-primary">AI</span> Resume
                </h1>
            </div>

            <div className="flex-1 py-6 px-4 space-y-2">
                <Link href="/resume-builder/new">
                    <Button className="w-full justify-start mb-6" size="lg">
                        <PlusCircle className="mr-2 h-4 w-4" /> New Resume
                    </Button>
                </Link>

                <nav className="space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    className={cn(
                                        'w-full justify-start',
                                        isActive && 'bg-secondary font-medium'
                                    )}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.name}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-border">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
