'use client';

import { useResume } from '../ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function PersonalForm() {
    const { resumeData, updateSection } = useResume();
    const { personalInfo, aiSummary } = resumeData;
    const [enhancing, setEnhancing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'aiSummary') {
            updateSection('aiSummary', value);
        } else {
            updateSection('personalInfo', { ...personalInfo, [name]: value });
        }
    };

    const enhanceSummary = async () => {
        if (!aiSummary) return;
        setEnhancing(true);
        try {
            const res = await fetch('/api/ai/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: aiSummary, section: 'summary' }),
            });
            if (!res.ok) throw new Error('AI request failed');
            const data = await res.json();
            if (data.improvedText) {
                updateSection('aiSummary', data.improvedText);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setEnhancing(false);
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChange}
                        placeholder="New York, NY"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        value={personalInfo.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <Input
                        id="portfolio"
                        name="portfolio"
                        value={personalInfo.portfolio}
                        onChange={handleChange}
                        placeholder="johndoe.com"
                    />
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                    <Label htmlFor="aiSummary">Professional Summary</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary h-6"
                        onClick={enhanceSummary}
                        disabled={enhancing || !aiSummary}
                    >
                        <Sparkles className={`mr-1 h-3 w-3 ${enhancing ? 'animate-pulse' : ''}`} />
                        {enhancing ? 'Enhancing...' : 'AI Enhance'}
                    </Button>
                </div>
                <Textarea
                    id="aiSummary"
                    name="aiSummary"
                    value={aiSummary}
                    onChange={handleChange}
                    placeholder="Briefly describe your professional background and goals..."
                    className="min-h-[100px]"
                />
            </div>
        </div>
    );
}
