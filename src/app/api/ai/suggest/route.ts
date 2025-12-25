import { NextRequest, NextResponse } from 'next/server';
import { generateAIContent, AIRequest } from '@/lib/openrouter';

export async function POST(req: NextRequest) {
    try {
        const body: AIRequest = await req.json();

        // Validation
        if (!body.targetRole || !body.currentSection) {
            return NextResponse.json({ error: 'Target Role and Section are required' }, { status: 400 });
        }

        const result = await generateAIContent(body);

        return NextResponse.json(result);
    } catch (error) {
        console.error('AI API Error:', error);
        return NextResponse.json({
            error: 'Failed to generate content',
            analysis: 'Failed to connect to AI',
            confidence_score: 0
        }, { status: 500 });
    }
}
