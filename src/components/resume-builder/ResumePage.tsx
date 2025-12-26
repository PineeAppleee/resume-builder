import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResumePageProps {
    children: ReactNode;
    className?: string;
}

export const ResumePage = ({ children, className }: ResumePageProps) => {
    return (
        <div
            id="resume-page"
            className={cn(
                "relative bg-white mx-auto overflow-hidden",
                "relative bg-white mx-auto overflow-hidden",
                "w-[210mm] min-h-[297mm]", // Screen: Strict A4 width, allow height growth for preview
                // Print: Enforce specific behavior
                "print:w-[210mm] print:h-auto print:min-h-[297mm] print:overflow-visible print:shadow-none print:m-0",
                className
            )}
        >
            {children}
        </div>
    );
};
