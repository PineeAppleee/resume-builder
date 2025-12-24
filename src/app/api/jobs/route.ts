import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import JobApplication from '@/models/JobApplication';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await req.json();

        const job = await JobApplication.create({
            ...body,
            userId: session.userId,
        });

        return NextResponse.json(job, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        // @ts-ignore
        const jobs = await JobApplication.find({ userId: session.userId }).sort({ dateApplied: -1 });

        return NextResponse.json(jobs, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
