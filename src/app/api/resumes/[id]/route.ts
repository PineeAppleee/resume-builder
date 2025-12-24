import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import { getSession } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectToDatabase();
        const body = await req.json();

        const resume = await Resume.findOneAndUpdate(
            // @ts-ignore
            { _id: id, userId: session.userId },
            { ...body, updatedAt: Date.now() },
            { new: true }
        );

        if (!resume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }

        return NextResponse.json(resume, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await connectToDatabase();

        // @ts-ignore
        const resume = await Resume.findOneAndDelete({ _id: id, userId: session.userId });

        if (!resume) {
            return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Resume deleted' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
