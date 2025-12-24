
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
    if (!session) redirect('/login');

    const { id } = await params;

    let initialData = null;

    if (id !== 'new') {
        initialData = await getResume(id, session.userId);
        if (!initialData) redirect('/dashboard');
    }

    return (
        <ResumeProvider initialData={initialData}>
            <ResumeBuilderClient />
        </ResumeProvider>
    );
}
