import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import JobApplication from '@/models/JobApplication';
import JobTracker from '@/components/tracker/JobTracker';

async function getJobs(userId: string) {
    await connectToDatabase();
    // @ts-ignore
    const jobs = await JobApplication.find({ userId }).sort({ dateApplied: -1 });
    return JSON.parse(JSON.stringify(jobs));
}

export default async function JobTrackerPage() {
    const session = await getSession();
    if (!session) redirect('/login');

    const jobs = await getJobs(session.userId);

    return (
        <div className="h-[calc(100vh-4rem)]">
            <JobTracker initialJobs={jobs} />
        </div>
    );
}
