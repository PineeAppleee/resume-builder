'use client';

import { useResume } from '../ResumeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function ProjectsForm() {
    const { resumeData, updateSection } = useResume();
    const { projects } = resumeData;

    const addProject = () => {
        updateSection('projects', [
            ...projects,
            {
                id: uuidv4(),
                name: '',
                description: '',
                link: '',
                techStack: '',
            },
        ]);
    };

    const removeProject = (id: string) => {
        updateSection(
            'projects',
            projects.filter((proj) => proj.id !== id)
        );
    };

    const updateProject = (id: string, field: string, value: string) => {
        updateSection(
            'projects',
            projects.map((proj) =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {projects.map((proj, index) => (
                <div key={proj.id} className="p-4 border border-border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">Project #{index + 1}</h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProject(proj.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Project Name</Label>
                            <Input
                                value={proj.name}
                                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                                placeholder="My Awesome App"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Link</Label>
                            <Input
                                value={proj.link}
                                onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label>Tech Stack</Label>
                            <Input
                                value={proj.techStack}
                                onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                                placeholder="React, generic-ai-tool, MongoDB..."
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={proj.description}
                            onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                            placeholder="Describe what you built..."
                        />
                    </div>
                </div>
            ))}

            <Button onClick={addProject} variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
        </div>
    );
}
