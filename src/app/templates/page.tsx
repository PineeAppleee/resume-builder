'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const templates = [
    {
        id: 'professional',
        name: 'Professional',
        category: 'general',
        description: 'Clean, structured layout perfect for corporate roles.',
        color: 'bg-slate-100',
    },
    {
        id: 'modern',
        name: 'Modern',
        category: 'general',
        description: 'Bold header and stylish accents for varied fields.',
        color: 'bg-primary/10',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        category: 'fresher',
        description: 'Typography-focused, elegant and simple.',
        color: 'bg-white border',
    },
    {
        id: 'tech',
        name: 'DevStream',
        category: 'tech',
        description: 'Monospaced, skill-focused layout for developers.',
        color: 'bg-slate-900',
    },
    {
        id: 'creative',
        name: 'Studio',
        category: 'creative',
        description: 'High-impact design for designers and marketers.',
        color: 'bg-purple-100',
    }
];

const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'general', label: 'Standard' },
    { id: 'tech', label: 'Tech & Engineering' },
    { id: 'creative', label: 'Creative' },
    { id: 'fresher', label: 'Fresher / Academic' },
];

export default function TemplateGalleryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);
    const [filter, setFilter] = useState('all');

    const filteredTemplates = templates.filter(t => filter === 'all' || t.category === filter);

    const handleSelectTemplate = (templateId: string) => {
        setLoading(templateId);
        // Redirect to builder with selected template
        router.push(`/resume-builder/new?template=${templateId}`);
    };

    return (
        <div className="min-h-screen bg-background p-6 lg:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 text-center">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-2 mb-6">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">Choose Your Foundation</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Start with a professionally designed template. Our AI mentor will help you fill it with greatness.
                    </p>
                </header>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat.id
                                ? 'bg-primary text-primary-foreground shadow-md'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredTemplates.map((template) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={template.id}
                            whileHover={{ y: -8 }}
                            className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all"
                        >
                            {/* Preview Mockup */}
                            <div className={`aspect-[210/297] ${template.color} flex items-center justify-center relative overflow-hidden`}>
                                <div className="text-muted-foreground/50 font-bold uppercase tracking-widest text-center px-4">
                                    {template.name}
                                </div>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <Button
                                        size="lg"
                                        className="rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform"
                                        onClick={() => handleSelectTemplate(template.id)}
                                        disabled={loading === template.id}
                                    >
                                        {loading === template.id ? 'Structuring...' : 'Use Template'}
                                    </Button>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-xl mb-1">{template.name}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{template.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
