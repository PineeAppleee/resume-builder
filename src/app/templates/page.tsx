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
        color: 'bg-gray-100',
        image: '/templates/professional.png' // Placeholder
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Bold header and stylish accents for creative fields.',
        color: 'bg-primary/10',
        image: '/templates/modern.png' // Placeholder
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Typography-focused, elegant and simple.',
        color: 'bg-white border',
        image: '/templates/minimal.png' // Placeholder
    }
];

export default function TemplateGalleryPage() {
    const router = useRouter();
    const [loading, setLoading] = useState<string | null>(null);

    const handleSelectTemplate = async (templateId: string) => {
        setLoading(templateId);
        try {
            // Create a new resume with this template
            const res = await fetch('/api/resumes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'My Resume',
                    template: templateId
                }),
            });

            if (!res.ok) throw new Error('Failed to create resume');
            const data = await res.json();

            // Redirect to builder
            router.push(`/resume-builder/${data._id}`);
        } catch (error) {
            console.error(error);
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6 lg:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-2 mb-4">
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Choose a Template</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Start with a professionally designed template. You can switch anytime.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <motion.div
                            key={template.id}
                            whileHover={{ y: -5 }}
                            className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-all"
                        >
                            {/* Preview Mockup */}
                            <div className={`aspect-[210/297] ${template.color} flex items-center justify-center relative`}>
                                <div className="text-muted-foreground/50 font-semibold uppercase tracking-widest">
                                    {template.name} Preview
                                </div>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        size="lg"
                                        className="rounded-full"
                                        onClick={() => handleSelectTemplate(template.id)}
                                        disabled={loading === template.id}
                                    >
                                        {loading === template.id ? 'Creating...' : 'Use This Template'}
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2">{template.name}</h3>
                                <p className="text-muted-foreground text-sm">{template.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
