'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Wand2, X, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIRequest, AIResponse } from '@/lib/openrouter';

interface AIComposerProps {
    role: string;
    currentSection: string;
    contextText: string;
    onApply: (text: string) => void;
}

export default function AIComposer({ role, currentSection, contextText, onApply }: AIComposerProps) {
    const [loading, setLoading] = useState(false);
    const [suggestion, setSuggestion] = useState<AIResponse | null>(null);

    const handleGenerate = async (task: 'improve' | 'suggest') => {
        setLoading(true);
        setSuggestion(null);
        try {
            const res = await fetch('/api/ai/suggest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userText: contextText,
                    targetRole: role,
                    currentSection: currentSection,
                    task: task // Passed for legacy or specific prompting
                })
            });
            const data = await res.json();
            setSuggestion(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copySkill = (skill: string) => {
        navigator.clipboard.writeText(skill);
        // We assume parent component or global toaster handles this, but we can try basic alert or just copy
    };

    return (
        <div className="w-80 border-l border-border bg-card h-full flex flex-col shadow-xl z-20">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center gap-2 bg-secondary/30">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">AI Companion</span>
                <div className="ml-auto text-xs text-muted-foreground px-2 py-0.5 bg-background rounded-full border">
                    {role || 'General'}
                </div>
            </div>

            {/* AI Output Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-40 space-y-3 text-muted-foreground"
                        >
                            <Bot className="w-8 h-8 animate-bounce text-primary" />
                            <span className="text-sm font-medium">Analyzing {currentSection}...</span>
                        </motion.div>
                    ) : suggestion ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            {/* Analysis Card */}
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                                <div className="flex items-start gap-2">
                                    <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-sm text-primary mb-1">AI Insight</h4>
                                        <p className="text-xs text-foreground/80 leading-relaxed">
                                            {suggestion.notes}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-[10px] font-medium text-muted-foreground">Confidence:</span>
                                    <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{ width: `${suggestion.confidence_score}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-primary font-bold">{suggestion.confidence_score}%</span>
                                </div>
                            </div>

                            {/* Skill Suggestions */}
                            {suggestion.skill_suggestions && suggestion.skill_suggestions.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Suggested Keywords</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {suggestion.skill_suggestions.map((skill, i) => (
                                            <button
                                                key={i}
                                                onClick={() => copySkill(skill)}
                                                className="text-[10px] px-2 py-1 bg-secondary hover:bg-secondary/80 border border-transparent hover:border-border rounded-md transition-colors cursor-copy"
                                                title="Click to copy"
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Proposed Text */}
                            {suggestion.replacement_text && (
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Suggested Content
                                    </label>
                                    <div className="p-3 bg-secondary/50 rounded-md text-sm leading-relaxed border border-border whitespace-pre-wrap max-h-60 overflow-y-auto">
                                        {typeof suggestion.replacement_text === 'object'
                                            ? JSON.stringify(suggestion.replacement_text, null, 2)
                                            : suggestion.replacement_text}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            onClick={() => onApply(
                                                typeof suggestion.replacement_text === 'object'
                                                    ? JSON.stringify(suggestion.replacement_text, null, 2)
                                                    : suggestion.replacement_text as string
                                            )}
                                        >
                                            <Check className="w-3 h-3 mr-2" />
                                            Apply to Resume
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setSuggestion(null)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4">
                            <Bot className="w-12 h-12 mb-3 text-muted-foreground/30" />
                            <h3 className="font-semibold text-foreground mb-1">I'm ready to help</h3>
                            <p className="text-xs max-w-[200px]">
                                Focus on a section and I'll help you write or improve it.
                            </p>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-border bg-background grid grid-cols-2 gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleGenerate('suggest')}
                    disabled={loading}
                >
                    <Wand2 className="w-3 h-3 mr-2" />
                    Draft
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleGenerate('improve')}
                    disabled={loading || !contextText}
                >
                    <RefreshCw className="w-3 h-3 mr-2" />
                    Improve
                </Button>
            </div>
        </div>
    );
}
