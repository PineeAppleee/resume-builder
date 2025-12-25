import React from 'react';
import { ResumeData } from '@/components/resume-builder/ResumeContext';

export const FuturisticTemplate = ({ data }: { data: ResumeData }) => (
    <div className="font-sans text-gray-100 p-8 max-w-[210mm] min-h-[297mm] bg-slate-900 mx-auto theme-futuristic">
        <div className="flex justify-between items-end border-b border-cyan-500 pb-6 mb-8 relative">
            <div>
                <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    {data.personalInfo.fullName?.toUpperCase()}
                </h1>
                <p className="text-cyan-200 mt-2 tracking-widest uppercase text-sm">{data.targetRole || 'Visionary'}</p>
            </div>
            <div className="text-right text-xs text-gray-400 space-y-1">
                <div>{data.personalInfo.email}</div>
                <div>{data.personalInfo.phone}</div>
                <div>{data.personalInfo.location}</div>
            </div>
            <div className="absolute -bottom-1 right-0 w-20 h-1 bg-cyan-500"></div>
        </div>

        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-cyan-400">
                        <span className="w-2 h-8 bg-cyan-500 mr-3 rounded-full"></span>
                        EXPERIENCE
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l border-gray-700">
                                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-cyan-900 border border-cyan-500"></div>
                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                <div className="flex justify-between text-sm text-cyan-200/60 mb-2">
                                    <span>{exp.company}</span>
                                    <span className="font-mono">{exp.startDate} — {exp.endDate}</span>
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed font-light">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="col-span-4 space-y-8">
                <section className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h2 className="text-lg font-bold mb-4 text-cyan-400">SKILLS</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="bg-slate-900 border border-cyan-900/50 text-cyan-100 text-xs px-2 py-1 rounded">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold mb-4 text-cyan-400">EDUCATION</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <div className="font-bold text-white">{edu.school}</div>
                                <div className="text-sm text-gray-400">{edu.degree}</div>
                                <div className="text-xs text-gray-500 font-mono mt-1">{edu.endDate}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    </div>
);
