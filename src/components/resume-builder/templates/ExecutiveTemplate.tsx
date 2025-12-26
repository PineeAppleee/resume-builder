import React from 'react';
import { ResumeData } from '@/components/resume-builder/ResumeContext';
import { ResumePage } from '@/components/resume-builder/ResumePage';

export const ExecutiveTemplate = ({ data }: { data: ResumeData }) => {
    return (
        <ResumePage className="font-serif text-gray-900 p-8 bg-white mx-auto leading-relaxed">
            {/* Header */}
            <header className="border-b-2 border-gray-900 pb-6 mb-8 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{data.personalInfo.fullName}</h1>
                <div className="flex justify-center gap-4 text-sm font-medium">
                    <span>{data.personalInfo.email}</span>
                    <span>•</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{data.personalInfo.location}</span>
                </div>
            </header>

            {/* Summary */}
            {data.aiSummary && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Professional Summary</h2>
                    <p className="text-justify">{data.aiSummary}</p>
                </section>
            )}

            {/* Experience */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Professional Experience</h2>
                <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                        <div key={i} className="mb-4 break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-lg">{exp.role}</h3>
                                <span className="text-sm italic">{exp.startDate} – {exp.endDate}</span>
                            </div>
                            <div className="text-gray-700 font-semibold mb-2">{exp.company}</div>
                            <p className="whitespace-pre-line text-sm">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Key Projects</h2>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="mb-4 break-inside-avoid">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-lg">{proj.name}</h3>
                                {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-sm text-blue-800 underline">{proj.link}</a>}
                            </div>
                            {proj.techStack && <div className="text-sm italic mb-1 text-gray-600">Stack: {proj.techStack}</div>}
                            <p className="whitespace-pre-line text-sm">{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-2 break-inside-avoid">
                        <div className="flex justify-between font-bold">
                            <span>{edu.school}</span>
                            <span>{edu.endDate}</span>
                        </div>
                        <div>{edu.degree}</div>
                    </div>
                ))}
            </section>

            {/* Skills */}
            <section>
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Core Competencies</h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {data.skills.map((skill, i) => (
                        <span key={i} className="text-sm">• {skill}</span>
                    ))}
                </div>
            </section>
        </ResumePage>
    );
};
