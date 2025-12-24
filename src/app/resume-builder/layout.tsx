export default function ResumeBuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
