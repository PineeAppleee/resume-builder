'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type ResumeData = {
    _id?: string;
    title: string;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        linkedin: string;
        portfolio: string;
        location: string;
    };
    education: Array<{
        id: string;
        school: string;
        degree: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
    skills: string[];
    projects: Array<{
        id: string;
        name: string;
        description: string;
        link: string;
        techStack: string;
    }>;
    experience: Array<{
        id: string;
        company: string;
        role: string;
        startDate: string;
        endDate: string;
        description: string;
    }>;
    aiSummary: string;
    themeColor: string;
    template: string;
};

const initialResumeState: ResumeData = {
    title: 'My Resume',
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        location: '',
    },
    education: [],
    skills: [],
    projects: [],
    experience: [],
    aiSummary: '',
    themeColor: '#000000',
    template: 'professional',
};

interface ResumeContextType {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    updateSection: (section: keyof ResumeData, data: any) => void;
    saveResume: () => Promise<void>;
    loading: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children, initialData }: { children: React.ReactNode, initialData?: ResumeData }) {
    const [resumeData, setResumeData] = useState<ResumeData>(() => {
        if (!initialData) return initialResumeState;
        return {
            ...initialResumeState,
            ...initialData,
            personalInfo: {
                ...initialResumeState.personalInfo,
                ...(initialData.personalInfo || {}),
            },
            education: initialData.education || [],
            skills: initialData.skills || [],
            projects: initialData.projects || [],
            experience: initialData.experience || [],
        };
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const updateSection = (section: keyof ResumeData, data: any) => {
        setResumeData((prev) => ({ ...prev, [section]: data }));
    };

    const saveResume = async () => {
        setLoading(true);
        try {
            const method = resumeData._id ? 'PUT' : 'POST';
            const url = resumeData._id ? `/api/resumes/${resumeData._id}` : '/api/resumes';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData),
            });

            if (!res.ok) throw new Error('Failed to save');
            const data = await res.json();

            if (!resumeData._id && data._id) {
                setResumeData(prev => ({ ...prev, _id: data._id }));
                router.push(`/resume-builder/${data._id}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ResumeContext.Provider value={{ resumeData, setResumeData, updateSection, saveResume, loading }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
}
