import React from 'react';
import { ResumeData } from '@/components/resume-builder/ResumeContext';
import { ResumePage } from '@/components/resume-builder/ResumePage';

export const ClassicTemplate = ({ data }: { data: ResumeData }) => (
    <ResumePage className="font-serif text-black p-10 leading-relaxed theme-classic">
        <header className="text-center border-b-2 border-black pb-4 mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-widest">{data.personalInfo.fullName}</h1>
            <div className="mt-2 text-sm flex justify-center gap-3">
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                {data.personalInfo.email && <span>| {data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>| {data.personalInfo.phone}</span>}
                {data.personalInfo.linkedin && <span>| {data.personalInfo.linkedin}</span>}
            </div>
        </header>

        {data.aiSummary && (
            <section className="mb-6">
                <h2 className="font-bold text-lg border-b border-gray-300 mb-2">Professional Summary</h2>
                <p className="text-sm text-justify">{data.aiSummary}</p>
            </section>
        )}

        <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">Experience</h2>
            {data.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-base">{exp.role}</h3>
                        <span className="text-sm font-medium">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-sm font-semibold italic mb-1">{exp.company}</div>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap text-justify">{exp.description}</p>
                </div>
            ))}
        </section>

        {data.projects && data.projects.length > 0 && (
            <section className="mb-6">
                <h2 className="font-bold text-lg border-b border-gray-300 mb-2">Projects</h2>
                {data.projects.map((proj, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-base">{proj.name}</h3>
                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm text-blue-800 hover:underline">{proj.link}</a>}
                        </div>
                        {proj.techStack && <div className="text-sm italic mb-1">Stack: {proj.techStack}</div>}
                        <p className="text-sm text-gray-800 whitespace-pre-wrap text-justify">{proj.description}</p>
                    </div>
                ))}
            </section>
        )}

        <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">Education</h2>
            {data.education.map((edu, i) => (
                <div key={i} className="mb-2 flex justify-between">
                    <div>
                        <div className="font-bold">{edu.school}</div>
                        <div className="text-sm">{edu.degree}</div>
                    </div>
                    <div className="text-sm text-right">{edu.endDate}</div>
                </div>
            ))}
        </section>

        <section>
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">Skills</h2>
            <div className="text-sm">{data.skills.join(' • ')}</div>
        </section>
    </ResumePage>
);
