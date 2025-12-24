import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await req.json();

        // Remove _id if present to avoid casting error on create
        delete body._id;

        const resume = await Resume.create({
            ...body,
            userId: session.userId,
        });

        return NextResponse.json(resume, { status: 201 });
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
        const resumes = await Resume.find({ userId: session.userId }).sort({ updatedAt: -1 });

        return NextResponse.json(resumes, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
