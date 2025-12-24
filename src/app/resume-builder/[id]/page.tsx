
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import { ResumeProvider } from '@/components/resume-builder/ResumeContext';
import ResumeBuilderClient from '@/components/resume-builder/ResumeBuilderClient';

async function getResume(id: string, userId: string) {
    await connectToDatabase();
    // @ts-ignore
    const resume = await Resume.findOne({ _id: id, userId });
    if (!resume) return null;
    return JSON.parse(JSON.stringify(resume));
}

export default async function ResumeBuilderPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getSession();
    const { id } = await params;

    // Guest Mode: Allow access if no session, but only for 'new' or local IDs (we'll handle 'new' as guest start)
    // If user tries to access a specific ID (that is likely a mongoID) without auth, we should probably redirect to login or handle gracefully.
    // For now, let's treat 'new' without session as Guest Mode.

    if (!session && id !== 'new') {
        redirect('/login');
    }

    let initialData = null;

    if (session && id !== 'new') {
        initialData = await getResume(id, session.userId);
        if (!initialData) redirect('/dashboard');
    }

    return (
        <ResumeProvider initialData={initialData} isGuest={!session}>
            <ResumeBuilderClient />
        </ResumeProvider>
    );
}
