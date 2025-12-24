'use client';

import { useState } from 'react';
import { useResume } from './ResumeContext';
import PersonalForm from './forms/PersonalForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import ExperienceForm from './forms/ExperienceForm';
import ResumePreview from './ResumePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, LayoutTemplate } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
    { id: 'personal', title: 'Personal Info', component: PersonalForm },
    { id: 'education', title: 'Education', component: EducationForm },
    { id: 'skills', title: 'Skills', component: SkillsForm },
    { id: 'experience', title: 'Experience', component: ExperienceForm },
    { id: 'projects', title: 'Projects', component: ProjectsForm },
];

export default function ResumeBuilderClient() {
    const [currentStep, setCurrentStep] = useState(0);
    const { saveResume, loading } = useResume();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const StepComponent = steps[currentStep].component;

    return (
        <div className="flex h-full">
            {/* Left: Form Area */}
            <div className="w-full lg:w-1/2 flex flex-col h-full border-r border-border bg-card">
                {/* Top Bar */}
                <div className="p-4 border-b border-border flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LayoutTemplate className="w-5 h-5 text-primary" />
                        <span className="font-semibold">{steps[currentStep].title}</span>
                        <span className="text-muted-foreground text-sm ml-2">Step {currentStep + 1} of {steps.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground hidden xl:inline">Template:</span>
                        <select
                            className="text-sm border border-input rounded-md px-2 py-1 bg-background focus:ring-1 focus:ring-ring"
                            value={useResume().resumeData.template || 'professional'}
                            onChange={(e) => useResume().updateSection('template', e.target.value)}
                        >
                            <option value="professional">Professional</option>
                            <option value="modern">Modern</option>
                            <option value="minimal">Minimal</option>
                        </select>
                        <Button variant="outline" size="sm" onClick={saveResume} disabled={loading}>
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <StepComponent />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Actions */}
                <div className="p-4 border-t border-border flex justify-between bg-background">
                    <Button
                        variant="ghost"
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
                        Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            {/* Right: Live Preview */}
            <div className="hidden lg:block w-1/2 h-full bg-secondary/50 p-8 overflow-y-auto">
                <div className="max-w-[210mm] mx-auto bg-white shadow-2xl min-h-[297mm]">
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}
