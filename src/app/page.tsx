'use client';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <header className="px-6 lg:px-8 h-16 flex items-center justify-between border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Sparkles className="text-primary w-6 h-6" />
          <span>ResumeCraft</span>
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
        <section className="relative py-20 lg:py-32 px-6 text-center max-w-5xl mx-auto">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50 blur-3xl"></div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              Resume<span className="text-primary">Craft</span> - Free & AI Enhanced
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Create professional, ATS-friendly resumes in minutes using our AI-powered builder.
              Track your job applications and land your next role faster.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-4 justify-center pt-4">
              <Link href="/signup">
                <Button size="lg" className="rounded-full h-12 px-8 text-base">
                  Start Building Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
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

      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        © 2025 ResumeCraft. Free & Open Source.
      </footer>
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
