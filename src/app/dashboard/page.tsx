import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Briefcase, Plus } from 'lucide-react';
import User from '@/models/User';
import connectToDatabase from '@/lib/db';
import { DashboardContent, AnimatedCard } from '@/components/dashboard/DashboardContent';

async function getUserData(userId: string) {
    await connectToDatabase();
    // In a real app, I'd aggregate counts here (e.g., Resume.countDocuments({userId}))
    // For now, returning mock stats
    return {
        resumesCount: 0,
        applicationsCount: 0,
        interviewsCount: 0
    };
}

export default async function DashboardPage() {
    const session = await getSession();
    const userData = session ? await getUserData(session.userId) : { resumesCount: 0, applicationsCount: 0, interviewsCount: 0 };
    // @ts-ignore
    const userName = session?.email?.split('@')[0] || 'User';

    return (
        <DashboardContent>
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Welcome back, {userName}! Here&apos;s an overview of your progress.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <AnimatedCard>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Resumes
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userData.resumesCount}</div>
                            <p className="text-xs text-muted-foreground">
                                +0 from last month
                            </p>
                        </CardContent>
                    </Card>
                </AnimatedCard>
                <AnimatedCard>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Job Applications
                            </CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userData.applicationsCount}</div>
                            <p className="text-xs text-muted-foreground">
                                +0 this week
                            </p>
                        </CardContent>
                    </Card>
                </AnimatedCard>
                <AnimatedCard>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Interviews Scheduled
                            </CardTitle>
                            <Briefcase className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{userData.interviewsCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Keep it up!
                            </p>
                        </CardContent>
                    </Card>
                </AnimatedCard>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <AnimatedCard className="col-span-4">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Recent Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-10 text-muted-foreground">
                                No applications yet. Start tracking your jobs!
                                <div className="mt-4">
                                    <Link href="/tracker">
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" /> Add Application
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedCard>
                <AnimatedCard className="col-span-3">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href="/resume-builder/new" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <FileText className="mr-2 h-4 w-4" /> Create New Resume
                                </Button>
                            </Link>
                            <Link href="/tracker" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <Briefcase className="mr-2 h-4 w-4" /> Update Job Status
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </AnimatedCard>
            </div>
        </DashboardContent>
    );
}
