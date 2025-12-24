'use client';

import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
};

export function DashboardContent({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {children}
        </motion.div>
    );
}

export function AnimatedCard({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div variants={item} className={className}>
            {children}
        </motion.div>
    );
}
