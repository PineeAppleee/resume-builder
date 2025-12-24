'use client';

import { useResume } from '../ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useState } from 'react';

export default function SkillsForm() {
    const { resumeData, updateSection } = useResume();
    const { skills } = resumeData;
    const [newSkill, setNewSkill] = useState('');

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            updateSection('skills', [...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        updateSection(
            'skills',
            skills.filter((skill) => skill !== skillToRemove)
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-2">
                <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a skill (e.g. React, Python)"
                />
                <Button onClick={addSkill} type="button">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1">
                        {skill}
                        <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                        </button>
                    </Badge>
                ))}
                {skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">No skills added yet.</p>
                )}
            </div>

            <div className="bg-secondary/20 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Pro Tip:</span> Add technical skills, soft skills, and tools you are proficient in.
                </p>
            </div>
        </div>
    );
}
