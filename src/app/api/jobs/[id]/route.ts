import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import JobApplication from '@/models/JobApplication';
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

        // @ts-ignore
        const job = await JobApplication.findOneAndUpdate(
            { _id: id, userId: session.userId },
            { ...body },
            { new: true }
        );

        if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200 });
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
        const job = await JobApplication.findOneAndDelete({ _id: id, userId: session.userId });

        if (!job) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Job deleted' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
