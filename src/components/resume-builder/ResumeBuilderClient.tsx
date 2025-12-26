'use client';

import { useState, useEffect } from 'react';
import { useResume } from '@/components/resume-builder/ResumeContext';
import { useRouter, useSearchParams } from 'next/navigation';
import OnboardingForm from './forms/OnboardingForm';
import PersonalForm from './forms/PersonalForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import ExperienceForm from './forms/ExperienceForm';
import ResumePreview from './ResumePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save, LayoutTemplate, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasLayout from '@/components/canvas/CanvasLayout';
import AIComposer from '@/components/canvas/AIComposer';
import { toast } from 'sonner';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

const steps = [
    { id: 'onboarding', title: 'Career Goal', component: OnboardingForm },
    { id: 'personal', title: 'Personal Info', component: PersonalForm },
    { id: 'experience', title: 'Experience', component: ExperienceForm },
    { id: 'education', title: 'Education', component: EducationForm },
    { id: 'skills', title: 'Skills', component: SkillsForm },
    { id: 'projects', title: 'Projects', component: ProjectsForm },
];

export default function ResumeBuilderClient() {
    const [currentStep, setCurrentStep] = useState(0);
    const { saveResume, loading, resumeData, updateSection, isGuest, activeItemId } = useResume();
    const searchParams = useSearchParams();

    // Initialize template from URL
    useEffect(() => {
        const templateParam = searchParams.get('template');
        if (templateParam && resumeData.template !== templateParam) {
            updateSection('template', templateParam);
        }
    }, [searchParams, resumeData.template, updateSection]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const StepComponent = steps[currentStep].component;
    const currentStepId = steps[currentStep].id;

    // Get context for AI based on current step
    const getContextText = () => {
        switch (currentStepId) {
            case 'personal': return JSON.stringify(resumeData.personalInfo, null, 2);
            case 'experience':
                if (activeItemId) {
                    const activeExp = resumeData.experience.find(e => e.id === activeItemId);
                    if (activeExp) return JSON.stringify(activeExp, null, 2);
                }
                return JSON.stringify(resumeData.experience, null, 2);
            case 'education':
                if (activeItemId) {
                    const activeEdu = resumeData.education.find(e => e.id === activeItemId);
                    if (activeEdu) return JSON.stringify(activeEdu, null, 2);
                }
                return JSON.stringify(resumeData.education, null, 2);
            case 'skills': return resumeData.skills.join(', ');
            case 'projects':
                if (activeItemId) {
                    const activeProj = resumeData.projects.find(e => e.id === activeItemId);
                    if (activeProj) return JSON.stringify(activeProj, null, 2);
                }
                return JSON.stringify(resumeData.projects, null, 2);
            case 'onboarding': return `Target Role: ${resumeData.targetRole}, Experience: ${resumeData.experienceLevel}, Summary: ${resumeData.aiSummary || ''}`;
            default: return '';
        }
    };

    const handleAIApply = (text: string) => {
        try {
            // Attempt to parse as JSON for structured updates
            let parsed;
            try {
                parsed = JSON.parse(text);
            } catch {
                parsed = null;
            }

            // 1. Personal Info (Structure Update)
            if (currentStepId === 'personal' && parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
                updateSection('personalInfo', { ...resumeData.personalInfo, ...parsed });
                toast.success("Personal Info updated!");
                return;
            }

            // 2. Skills (Array Update)
            if (currentStepId === 'skills' && (Array.isArray(parsed) || typeof parsed === 'string')) {
                const newSkills = Array.isArray(parsed) ? parsed : (parsed as string).split(',').map((s: string) => s.trim());
                updateSection('skills', newSkills);
                toast.success("Skills updated!");
                return;
            }

            // 3. Experience (Targeted Update)
            if (currentStepId === 'experience' && activeItemId) {
                const updated = resumeData.experience.map(exp => {
                    if (exp.id === activeItemId) {
                        return (parsed && typeof parsed === 'object') ? { ...exp, ...parsed } : { ...exp, description: text };
                    }
                    return exp;
                });
                updateSection('experience', updated);
                toast.success("Experience updated!");
                return;
            }

            // 4. Education (Targeted Update)
            if (currentStepId === 'education' && activeItemId) {
                const updated = resumeData.education.map(edu => {
                    if (edu.id === activeItemId) {
                        return (parsed && typeof parsed === 'object') ? { ...edu, ...parsed } : { ...edu, description: text };
                    }
                    return edu;
                });
                updateSection('education', updated);
                toast.success("Education updated!");
                return;
            }

            // 5. Projects (Targeted Update)
            if (currentStepId === 'projects' && activeItemId) {
                const updated = resumeData.projects.map(proj => {
                    if (proj.id === activeItemId) {
                        // Projects have 'description' and 'techStack'. If text, assume description.
                        return (parsed && typeof parsed === 'object') ? { ...proj, ...parsed } : { ...proj, description: text };
                    }
                    return proj;
                });
                updateSection('projects', updated);
                toast.success("Project updated!");
                return;
            }

            // 6. Summary (Onboarding)
            if (currentStepId === 'onboarding' && typeof text === 'string') {
                updateSection('aiSummary', text);
                toast.success("Summary updated!");
                return;
            }

        } catch (e) {
            console.error(e);
        }

        navigator.clipboard.writeText(text);
        toast.success("Result copied to clipboard!");
    };

    const handleDownloadPDF = async () => {
        const resumeElement = document.getElementById('resume-page');
        if (!resumeElement) {
            toast.error("Could not find resume to download");
            return;
        }

        const toastId = toast.loading("Preparing clean PDF...");

        try {
            // Options for html-to-image to ensure print-fidelity
            // We use a high scale for quality, but ensure the canvas is exactly A4 ratio
            const A4_WIDTH_MM = 210;
            const A4_HEIGHT_MM = 297;
            const MM_TO_PX = 3.7795275591; // 1mm = 3.78px at 96dpi

            // NOTE: We don't want to rely on the screen DPI for the clone's dimensions
            // We force the clone to be standard A4 screen-equivalent pixels

            // Clone:
            const clone = resumeElement.cloneNode(true) as HTMLElement;
            // Remove 'transform' or anything that might shift it
            clone.style.transform = 'none';
            clone.style.margin = '0';
            clone.style.padding = '0'; // If the template has padding, it's inside
            clone.style.width = '210mm';
            clone.style.minHeight = '297mm';
            clone.style.height = 'auto';
            clone.style.boxShadow = 'none';
            clone.style.background = 'white';

            // IMPORTANT: Flatten the structure for the capture container
            const container = document.createElement('div');
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '210mm'; // Exactly A4
            container.style.height = 'auto'; // Let it grow if needed, but we paginate later if needed
            container.style.zIndex = '-9999';
            container.style.visibility = 'hidden'; // Hide from user, but visible to renderer? 
            // html-to-image needs visibility. 'hidden' might work, but safer is opacity 0 or behind z-index
            container.style.visibility = 'visible';
            container.style.opacity = '0';

            container.appendChild(clone);
            document.body.appendChild(container);

            // Wait for images/fonts
            await new Promise(resolve => setTimeout(resolve, 800));

            // Generate Canvas
            // Scale 2 is usually enough for retina-like quality in PDF
            const canvas = await htmlToImage.toCanvas(clone, {
                quality: 1.0,
                pixelRatio: 3, // Higher quality
                backgroundColor: '#ffffff',
            });

            // Cleanup DOM
            document.body.removeChild(container);

            // Generate PDF
            // @ts-ignore
            const PdfClass = (jsPDF as any).jsPDF || (jsPDF as any).default || jsPDF;
            const pdf = new PdfClass({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate height based on aspect ratio to prevent stretching
            const imgProps = pdf.getImageProperties(imgData);
            const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // If height exceeds A4, we might need multiple pages (future proofing)
            // For now, we fit or cut. Text overflow in canvas = cut.
            // But 'MinimalTemplate' is usually single page.

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfImgHeight);

            // Clean filename
            const rawName = resumeData.personalInfo.fullName || 'Resume';
            const cleanName = rawName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const filename = `${cleanName}_resume.pdf`;

            pdf.save(filename);
            toast.dismiss(toastId);
            toast.success("PDF Downloaded Successfully");

        } catch (error: any) {
            console.error("PDF Generation Error:", error);
            toast.dismiss(toastId);
            toast.error("Failed to generate PDF. Please try 'Print -> Save as PDF' instead.");
        }
    };

    const Toolbar = (
        <>
            <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="font-semibold hidden md:inline">{resumeData.title || 'Untitled Resume'}</span>
            </div>

            {/* Step Indicators */}
            <div className="flex gap-1 overflow-x-auto max-w-[200px] md:max-w-md no-scrollbar">
                {steps.map((s, i) => (
                    <div
                        key={s.id}
                        className={`h-1.5 w-6 rounded-full transition-colors ${i <= currentStep ? 'bg-primary' : 'bg-primary/20'}`}
                    />
                ))}
            </div>

            <div className="flex items-center gap-2">
                <select
                    className="text-xs md:text-sm border border-input rounded-md px-2 py-1 bg-background focus:ring-1 focus:ring-ring w-24 md:w-auto"
                    value={resumeData.template || 'professional'}
                    onChange={(e) => updateSection('template', e.target.value)}
                >
                    <option value="professional">Professional</option>
                    <option value="modern">Modern</option>
                    <option value="minimal">Minimal</option>
                    <option value="tech">DevStream</option>
                    <option value="creative">Studio</option>
                    <option value="executive">Executive</option>
                    <option value="startup">Startup</option>
                    <option value="academic">Academic</option>
                    <option value="compact">Compact</option>
                    <option value="designer">Designer</option>
                    <option value="classic">Classic</option>
                    <option value="futuristic">Futuristic</option>
                </select>
                <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                    <span className="hidden md:inline mr-2">Download PDF</span>
                    <span className="md:hidden">PDF</span>
                </Button>
                <Button variant="default" size="sm" onClick={saveResume} disabled={loading}>
                    <Save className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">{loading ? 'Saving...' : 'Save'}</span>
                </Button>
            </div>
        </>
    );

    return (
        <CanvasLayout
            toolbar={Toolbar}
            sidebar={
                <AIComposer
                    role={resumeData.targetRole || 'Professional'}
                    currentSection={steps[currentStep].title}
                    contextText={getContextText()}
                    onApply={handleAIApply}
                />
            }
            editor={
                <div className="flex flex-col h-full bg-card">
                    <div className="p-4 border-b border-border bg-secondary/10 flex justify-between items-center">
                        <span className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Editor</span>
                        {isGuest && (
                            <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">Guest Mode</span>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold mb-6">{steps[currentStep].title}</h2>
                                <StepComponent />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="p-4 border-t border-border flex justify-between bg-background shrink-0 pl-16">
                        <Button variant="ghost" onClick={handlePrev} disabled={currentStep === 0}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
                            Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            }
            preview={
                <ResumePreview />
            }
        />
    );
}
