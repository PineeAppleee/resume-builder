'use client';

import { ReactNode } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable-layout";

interface CanvasLayoutProps {
    editor: ReactNode;
    preview: ReactNode;
    sidebar: ReactNode;
    toolbar?: ReactNode;
}

export default function CanvasLayout({ editor, preview, sidebar, toolbar }: CanvasLayoutProps) {
    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden">
            {/* Toolbar */}
            {toolbar && (
                <div className="h-14 border-b border-border bg-background/50 backdrop-blur-sm z-30 px-4 flex items-center justify-between shrink-0">
                    {toolbar}
                </div>
            )}

            {/* Main Resizable Canvas */}
            <div className="flex-1 overflow-hidden relative">
                <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-none border-t shadow-inner">

                    {/* Panel 1: Editor (Entering Details) */}
                    <ResizablePanel defaultSize={35} minSize={25} maxSize={50} className="bg-card">
                        <div className="h-full w-full overflow-y-auto">
                            {editor}
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* Panel 2: Live Preview */}
                    <ResizablePanel defaultSize={40} minSize={30} className="bg-secondary/30">
                        <div className="h-full w-full overflow-y-auto p-8 relative">
                            <div id="print-area" className="mx-auto shadow-2xl origin-top transition-transform h-fit w-full max-w-[210mm]">
                                {preview}
                            </div>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* Panel 3: AI Suggestions */}
                    <ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="bg-card border-l relative z-[60]">
                        <div className="h-full w-full overflow-hidden">
                            {sidebar}
                        </div>
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>

            {/* Mobile Fallback (Hidden on Desktop, Visible on Mobile via CSS if we added it, but Resizable is mainly PC) */}
            {/* Note: This replaces the previous flex layout. For proper mobile support, we might need simple stacked divs if !lg */}
            {/* Since user asked for "resize windows", assumes Desktop. On mobile we usually hide preview/sidebar. */}
        </div>
    );
}
