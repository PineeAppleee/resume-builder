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
        description: 'Clean, structured layout perfect for corporate roles.',
        category: 'Standard',
        color: 'bg-gray-100',
        image: '/templates/professional.png'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Contemporary design with subtle accent colors.',
        category: 'Standard',
        color: 'bg-blue-50',
        image: '/templates/modern.png'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Distraction-free layout focusing on content.',
        category: 'Standard',
        color: 'bg-slate-50',
        image: '/templates/minimal.png'
    },
    {
        id: 'tech',
        name: 'DevStream',
        description: 'Monospaced font and code-like structure for developers.',
        category: 'Tech & Engineering',
        color: 'bg-zinc-900 text-white',
        image: '/templates/tech.png'
    },
    {
        id: 'creative',
        name: 'Studio',
        description: 'Bold typography and high-contrast design.',
        category: 'Creative',
        color: 'bg-purple-50',
        image: '/templates/creative.png'
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Authoritative, serif-based design for leadership roles.',
        category: 'Standard',
        color: 'bg-neutral-100',
        image: '/templates/executive.png'
    },
    {
        id: 'startup',
        name: 'Startup',
        description: 'Modern, vibrant, and impact-focused.',
        category: 'Tech & Engineering',
        color: 'bg-indigo-50',
        image: '/templates/startup.png'
    },
    {
        id: 'academic',
        name: 'Academic',
        description: 'Dense, scholarly layout for CVs and research.',
        category: 'Standard',
        color: 'bg-white border',
        image: '/templates/academic.png'
    },
    {
        id: 'compact',
        name: 'Compact',
        description: 'Optimized single-page layout for dense careers.',
        category: 'Standard',
        color: 'bg-stone-50',
        image: '/templates/compact.png'
    },
    {
        id: 'designer',
        name: 'Designer',
        description: 'Two-column layout with visual flair.',
        category: 'Creative',
        color: 'bg-yellow-50',
        image: '/templates/designer.png'
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
