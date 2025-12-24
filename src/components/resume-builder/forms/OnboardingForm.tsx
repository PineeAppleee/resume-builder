'use client';

import { useResume } from '../ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function OnboardingForm() {
    const { resumeData, updateSection } = useResume();
    const { targetRole, experienceLevel } = resumeData;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto py-10">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Let's set your career goal</h2>
                <p className="text-muted-foreground">ResumeMentor will tailor suggestions based on your target role.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="targetRole">Target Job Title</Label>
                    <Input
                        id="targetRole"
                        value={targetRole || ''}
                        onChange={(e) => updateSection('targetRole', e.target.value)}
                        placeholder="e.g. Product Manager, Full Stack Developer"
                        className="h-10"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="experienceLevel">Experience Level</Label>
                    <Select
                        value={experienceLevel || 'mid'}
                        onValueChange={(value) => updateSection('experienceLevel', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fresher">Fresher / Entry Level (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid Level (3-7 years)</SelectItem>
                            <SelectItem value="senior">Senior / Lead (8+ years)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
