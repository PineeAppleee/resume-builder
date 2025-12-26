import React from 'react';
import { ResumeData } from '@/components/resume-builder/ResumeContext';
import { ResumePage } from '@/components/resume-builder/ResumePage';

export const StartupTemplate = ({ data }: { data: ResumeData }) => {
    return (
        <ResumePage className="font-sans text-slate-800 p-8 bg-white mx-auto">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-5xl font-extrabold tracking-tight text-blue-600 mb-4">{data.personalInfo.fullName}</h1>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                    <span className="bg-slate-100 px-2 py-1 rounded">{data.personalInfo.email}</span>
                    <span className="bg-slate-100 px-2 py-1 rounded">{data.personalInfo.phone}</span>
                    <span className="bg-slate-100 px-2 py-1 rounded">{data.personalInfo.location}</span>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Column */}
                <div className="col-span-8">
                    {data.aiSummary && (
                        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                            <p className="italic text-slate-700">{data.aiSummary}</p>
                        </div>
                    )}

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Experience</h2>
                        <div className="space-y-8 border-l-2 border-slate-200 pl-6 ml-2">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative break-inside-avoid">
                                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
                                    <h3 className="text-xl font-bold">{exp.role}</h3>
                                    <div className="text-blue-600 font-medium mb-1">{exp.company}</div>
                                    <div className="text-xs text-slate-400 mb-3">{exp.startDate} – {exp.endDate}</div>
                                    <p className="text-sm leading-relaxed text-slate-600">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {data.projects && data.projects.length > 0 && (
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Built Projects</h2>
                            <div className="space-y-6">
                                {data.projects.map((proj, i) => (
                                    <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-slate-800">{proj.name}</h3>
                                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline">Link ↗</a>}
                                        </div>
                                        {proj.techStack && <div className="text-xs font-mono text-slate-500 mb-2">{proj.techStack}</div>}
                                        <p className="text-sm text-slate-600">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Education</h2>
                        {data.education.map((edu, i) => (
                            <div key={i} className="mb-4">
                                <div className="font-bold text-sm">{edu.school}</div>
                                <div className="text-xs text-slate-500 mb-1">{edu.startDate} - {edu.endDate}</div>
                                <div className="text-sm text-blue-600">{edu.degree}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </ResumePage>
    );
};
