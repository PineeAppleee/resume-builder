'use client';

import { useResume } from './ResumeContext';
import { TemplateMap } from './templates';
import { useRef, useEffect, useState } from 'react';

export default function ResumePreview() {
    const { resumeData } = useResume();
    const TemplateComponent = TemplateMap[resumeData.template || 'professional'] || TemplateMap.professional;
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.8);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth; // Available width (minus padding)
                const targetWidth = 794; // A4 width in pixels at 96 DPI (approx 210mm)

                // Calculate scale to fit. Max scale 1.0, minus some margin
                const newScale = Math.min((containerWidth - 64) / targetWidth, 1.0);
                setScale(newScale > 0.3 ? newScale : 0.3); // Minimum scale safety
            }
        };

        window.addEventListener('resize', updateScale);
        updateScale(); // Initial call

        // ResizeObserver for container resizing (e.g. sidebar dragging)
        const observer = new ResizeObserver(updateScale);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            window.removeEventListener('resize', updateScale);
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="h-full bg-secondary/30 w-full flex justify-center overflow-hidden relative"
        >
            <div
                className="overflow-y-auto h-full w-full flex justify-center no-scrollbar pt-8 pb-32"
            >
                <div>
                    <div
                        id="print-area"
                        className="bg-white shadow-2xl origin-top transition-transform duration-75 ease-out will-change-transform"
                        style={{
                            width: '210mm',
                            minHeight: '297mm',
                            transform: `scale(${scale})`,
                            marginBottom: `${(297 * scale)}mm` // Spacing for scroll
                        }}
                    >
                        <TemplateComponent data={resumeData} />
                    </div>
                </div>
            </div>

            {/* Scale Indicator */}
            <div id="scale-indicator" className="absolute bottom-4 right-4 bg-black/75 text-white px-3 py-1 rounded-full text-xs font-mono backdrop-blur-sm z-50">
                {Math.round(scale * 100)}%
            </div>
        </div>
    );
}
