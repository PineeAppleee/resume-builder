'use client';

import { useResume } from './ResumeContext';
import { TemplateMap } from './templates';

export default function ResumePreview() {
    const { resumeData } = useResume();
    const TemplateComponent = TemplateMap[resumeData.template || 'professional'] || TemplateMap.professional;

    // Determine scale based on screen width (simple responsive scaling for preview)
    const scale = 0.8;

    return (
        <div className="h-full bg-gray-100 p-8 overflow-y-auto flex justify-center">
            <div
                className="bg-white shadow-2xl origin-top"
                style={{
                    width: '210mm', // A4 width
                    minHeight: '297mm', // A4 height
                    // transform: `scale(${scale})`, // Optional: if we want to scale it down to fit
                }}
            >
                <TemplateComponent data={resumeData} />
            </div>
        </div>
    );
}
