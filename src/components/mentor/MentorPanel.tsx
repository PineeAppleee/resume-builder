'use client';

import { useResume } from '@/components/resume-builder/ResumeContext';
import { Sparkles, Bot, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MentorPanel({ currentStepName }: { currentStepName: string }) {
    const { resumeData } = useResume();
    const [isOpen, setIsOpen] = useState(true);
    const [advice, setAdvice] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Context-aware advice (Mock for now, will connect to API)
    useEffect(() => {
        const getAdvice = async () => {
            setLoading(true);
            // Simulator delay
            await new Promise(resolve => setTimeout(resolve, 800));

            if (currentStepName === 'Onboarding') {
                setAdvice("I'll customize the resume structure based on the role you select.");
            } else if (currentStepName === 'Personal Info') {
                setAdvice("Common mistake: Adding a full address. City and State is sufficient!");
            } else if (currentStepName === 'Experience') {
                const role = resumeData.targetRole || 'this role';
                setAdvice(`For ${role}, focus on quantifiable achievements rather than just duties.`);
            } else {
                setAdvice("I'm here to help you build a great resume.");
            }
            setLoading(false);
        };

        if (isOpen) {
            getAdvice();
        }
    }, [currentStepName, resumeData.targetRole, isOpen]);

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 p-0 bg-primary hover:bg-primary/90"
            >
                <Bot className="w-8 h-8 text-white" />
            </Button>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-6 right-6 w-80 bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
        >
            <div className="bg-primary/5 p-4 border-b border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-md">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">AI Mentor</h3>
                        <p className="text-xs text-muted-foreground">{resumeData.targetRole || 'Career Coach'}</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                    <span className="text-xl">×</span>
                </Button>
            </div>

            <div className="p-4 min-h-[120px] bg-background">
                {loading ? (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm animate-pulse">
                        <Sparkles className="w-4 h-4" /> Thinking...
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <div className="text-sm text-foreground">
                            {advice}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3 bg-muted/30 border-t border-border flex gap-2">
                <Button size="sm" variant="outline" className="w-full text-xs" disabled>
                    <MessageSquare className="w-3 h-3 mr-2" /> Chat
                </Button>
                <Button size="sm" className="w-full text-xs">
                    <Sparkles className="w-3 h-3 mr-2" /> Suggest
                </Button>
            </div>
        </motion.div>
    );
}
