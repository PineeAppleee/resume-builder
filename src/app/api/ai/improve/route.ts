import { NextRequest, NextResponse } from 'next/server';
import { model } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const { text, section } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        let prompt = `Improve the following text for a professional resume. `;

        if (section === 'experience') {
            prompt += `Focus on action verbs, quantifiable achievements, and professional tone. Keep it concise. Current text: "${text}"`;
        } else if (section === 'summary') {
            prompt += `Make it compelling, highlighting key skills and career goals. Keep it under 50 words. Current text: "${text}"`;
        } else {
            prompt += `Make it more professional and polished. Current text: "${text}"`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedText = response.text().trim();

        return NextResponse.json({ improvedText });

    } catch (error) {
        console.error('AI Improvement Error:', error);
        return NextResponse.json({ error: 'Failed to improve text' }, { status: 500 });
    }
}
