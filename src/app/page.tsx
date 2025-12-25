'use client';

import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">ResumeCanvas</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                Your Career Story, <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  AI-Architected.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Experience a **Gemini Canvas-style** workspace where AI writes, refines, and structures your resume in real-time.
                Free forever. No hidden fees.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/resume-builder/new">
                <Button size="lg" className="text-lg px-8 h-12 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Open Canvas <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-muted-foreground">Everything you need to succeed in your job search.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Sparkles className="w-8 h-8 text-primary" />}
                title="AI Powered"
                description="Get smart suggestions for skills, summaries, and bullet points tailored to your role."
              />
              <FeatureCard
                icon={<FileText className="w-8 h-8 text-primary" />}
                title="ATS Friendly"
                description="Templates designed to pass Applicant Tracking Systems and get you noticed."
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8 text-primary" />}
                title="Job Tracking"
                description="Manage all your applications in one place with a drag-and-drop Kanban board."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">What Users Say</h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <TestimonialCard
                quote="This resume builder helped me land interviews at top tech companies. The AI suggestions are a game changer!"
                author="Alex Doe"
                role="Software Engineer"
              />
              <TestimonialCard
                quote="I love the job tracker. It keeps me organized and motivated throughout my search."
                author="Sarah Smith"
                role="Product Manager"
              />
            </div>
          </div>
        </section>
      </main>

      <div className="text-center text-muted-foreground text-sm py-6 border-t border-border">
        © 2025 ResumeCanvas. Open Source & Free.
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all"
    >
      <div className="mb-4 bg-primary/10 w-fit p-3 rounded-lg">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <div className="p-6 rounded-xl bg-secondary/20 border border-border">
      <p className="italic mb-4 text-muted-foreground">"{quote}"</p>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  );
}
