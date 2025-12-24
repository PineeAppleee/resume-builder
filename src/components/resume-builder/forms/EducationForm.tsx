'use client';

import { useResume } from '../ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function EducationForm() {
    const { resumeData, updateSection } = useResume();
    const { education } = resumeData;

    const addEducation = () => {
        updateSection('education', [
            ...education,
            {
                id: uuidv4(),
                school: '',
                degree: '',
                startDate: '',
                endDate: '',
                description: '',
            },
        ]);
    };

    const removeEducation = (id: string) => {
        updateSection(
            'education',
            education.filter((edu) => edu.id !== id)
        );
    };

    const updateEducation = (id: string, field: string, value: string) => {
        updateSection(
            'education',
            education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {education.map((edu, index) => (
                <div key={edu.id} className="p-4 border border-border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">Education #{index + 1}</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEducation(edu.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>School</Label>
                            <Input
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                placeholder="University of Examples"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Degree</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="Bachelor of Science"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                            placeholder="e.g. GPU Programming, Algorithms..."
                        />
                    </div>
                </div>
            ))}

            <Button onClick={addEducation} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
        </div>
    );
}
