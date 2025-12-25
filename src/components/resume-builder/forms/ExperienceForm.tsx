'use client';

import { useResume } from '../ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

export default function ExperienceForm() {
    const { resumeData, updateSection, setActiveItemId } = useResume();
    const { experience } = resumeData;
    const [enhancingId, setEnhancingId] = useState<string | null>(null);

    const addExperience = () => {
        updateSection('experience', [
            ...experience,
            {
                id: uuidv4(),
                company: '',
                role: '',
                startDate: '',
                endDate: '',
                description: '',
            },
        ]);
    };

    const removeExperience = (id: string) => {
        updateSection(
            'experience',
            experience.filter((exp) => exp.id !== id)
        );
    };

    const updateExperience = (id: string, field: string, value: string) => {
        updateSection(
            'experience',
            experience.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        );
    };

    // Real AI enhancement
    const enhanceDescription = async (id: string, currentText: string) => {
        if (!currentText) return;
        setEnhancingId(id);

        try {
            const res = await fetch('/api/ai/improve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: currentText, section: 'experience' }),
            });

            if (!res.ok) throw new Error('AI request failed');

            const data = await res.json();
            if (data.improvedText) {
                updateExperience(id, 'description', data.improvedText);
            }
        } catch (error) {
            console.error(error);
            // Optionally add toast notification here
        } finally {
            setEnhancingId(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {experience.map((exp, index) => (
                <div
                    key={exp.id}
                    className="p-4 border border-border rounded-lg space-y-4 focus-within:border-primary/50 transition-colors"
                    onClick={() => setActiveItemId(exp.id)}
                    onFocus={() => setActiveItemId(exp.id)}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">Experience #{index + 1}</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeExperience(exp.id);
                            }}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Company</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder="Acme Corp"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Input
                                value={exp.role}
                                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                placeholder="Senior Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>Description</Label>
                            {/* Legacy AI Enhance button kept for redundancy, but Sidebar is preferred */}
                        </div>
                        <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Detailed description of your role..."
                            className="min-h-[120px]"
                        />
                    </div>
                </div>
            ))}

            <Button onClick={addExperience} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
        </div>
    );
}
