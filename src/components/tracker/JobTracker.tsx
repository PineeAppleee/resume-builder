'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type Job = {
    _id: string;
    company: string;
    role: string;
    status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
    dateApplied: string;
    notes?: string;
};

const columns = {
    Applied: { id: 'Applied', title: 'Applied' },
    Interview: { id: 'Interview', title: 'Interview' },
    Offer: { id: 'Offer', title: 'Offer' },
    Rejected: { id: 'Rejected', title: 'Rejected' },
};

export default function JobTracker({ initialJobs }: { initialJobs: Job[] }) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // New Job State
    const [newJob, setNewJob] = useState({ company: '', role: '' });

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;
        if (source.droppableId === destination.droppableId) return;

        const newStatus = destination.droppableId as Job['status'];

        // Optimistic update
        const updatedJobs = jobs.map((job) =>
            job._id === draggableId ? { ...job, status: newStatus } : job
        );
        setJobs(updatedJobs);

        // API Call
        try {
            await fetch(`/api/jobs/${draggableId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
        } catch (error) {
            console.error('Failed to update status', error);
            // Revert on failure (not implemented for brevity)
        }
    };

    const addJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newJob, status: 'Applied' }),
            });
            const data = await res.json();
            setJobs([data, ...jobs]);
            setIsDialogOpen(false);
            setNewJob({ company: '', role: '' });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteJob = async (id: string) => {
        try {
            await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
            setJobs(jobs.filter(j => j._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Job Tracker</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Application
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Job Application</DialogTitle>
                            <DialogDescription>
                                Track a new job application. It will be added to the "Applied" column.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={addJob} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                    required
                                    value={newJob.company}
                                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                                    placeholder="e.g. Google"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Input
                                    required
                                    value={newJob.role}
                                    onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                                    placeholder="e.g. Frontend Engineer"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : 'Add Job'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex-1 overflow-x-auto">
                <DragDropContext onDragEnd={onDragEnd}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="flex gap-6 min-w-max pb-4 h-full"
                    >
                        {Object.values(columns).map((column) => (
                            <motion.div
                                key={column.id}
                                className="w-80 flex flex-col"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <div className={`p-3 rounded-t-lg font-semibold flex justify-between items-center ${column.id === 'Applied' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                    column.id === 'Interview' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                        column.id === 'Offer' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                    }`}>
                                    {column.title}
                                    <Badge variant="outline" className="bg-background/50 border-transparent">
                                        {jobs.filter((job) => job.status === column.id).length}
                                    </Badge>
                                </div>
                                <div className="bg-secondary/20 flex-1 p-2 rounded-b-lg border border-t-0 border-border/50">
                                    <Droppable droppableId={column.id}>
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="space-y-3 min-h-[100px]"
                                            >
                                                {jobs
                                                    .filter((job) => job.status === column.id)
                                                    .map((job, index) => (
                                                        <Draggable key={job._id} draggableId={job._id} index={index}>
                                                            {(provided) => (
                                                                <Card
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className="cursor-move hover:shadow-md transition-shadow"
                                                                >
                                                                    <CardContent className="p-4 relative group">
                                                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                            <button onClick={() => deleteJob(job._id)} className="text-muted-foreground hover:text-destructive">
                                                                                <X className="h-4 w-4" />
                                                                            </button>
                                                                        </div>
                                                                        <h4 className="font-semibold">{job.company}</h4>
                                                                        <p className="text-sm text-muted-foreground">{job.role}</p>
                                                                        <div className="text-xs text-muted-foreground mt-2">
                                                                            {new Date(job.dateApplied).toLocaleDateString()}
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </DragDropContext>
            </div>
        </div>
    );
}

