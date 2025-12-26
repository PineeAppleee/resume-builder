import React from 'react';
import { ResumeData } from '@/components/resume-builder/ResumeContext';
import { ResumePage } from '@/components/resume-builder/ResumePage';

export const AcademicTemplate = ({ data }: { data: ResumeData }) => (
    <ResumePage className="font-serif text-black p-12 bg-white leading-normal">
        <header className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            <p className="text-sm">{data.personalInfo.location} | {data.personalInfo.email} | {data.personalInfo.phone}</p>
        </header>

        <section className="mb-6">
            <h2 className="font-bold uppercase text-sm border-b border-black mb-3">Education</h2>
            {data.education.map((edu, i) => (
                <div key={i} className="mb-2">
                    <div className="flex justify-between font-bold text-sm">
                        <span>{edu.school}</span>
                        <span>{edu.endDate}</span>
                    </div>
                    <div className="text-sm">{edu.degree}</div>
                </div>
            ))}
        </section>

        <section className="mb-6">
            <h2 className="font-bold uppercase text-sm border-b border-black mb-3">Experience</h2>
            {data.experience.map((exp, i) => (
                <div key={i} className="mb-4">
                    <div className="flex justify-between font-bold text-sm">
                        <span>{exp.role}</span>
                        <span>{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-sm italic mb-1">{exp.company}</div>
                    <p className="text-sm text-justify">{exp.description}</p>
                </div>
            ))}
        </section>

        <section className="mb-6">
            <h2 className="font-bold uppercase text-sm border-b border-black mb-3">Projects</h2>
            {data.projects.map((proj, i) => (
                <div key={i} className="mb-4">
                    <div className="flex justify-between font-bold text-sm">
                        <span>{proj.name}</span>
                        {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="font-normal underline text-blue-800">{proj.link}</a>}
                    </div>
                    {proj.techStack && <div className="text-xs italic mb-1 text-gray-700">Stack: {proj.techStack}</div>}
                    <p className="text-sm text-justify">{proj.description}</p>
                </div>
            ))}
        </section>

        <section>
            <h2 className="font-bold uppercase text-sm border-b border-black mb-3">Skills</h2>
            <p className="text-sm">{data.skills.join(', ')}</p>
        </section>
    </ResumePage>
);

export const CompactTemplate = ({ data }: { data: ResumeData }) => (
    <ResumePage className="font-sans text-gray-800 p-6 bg-white text-sm">
        <header className="border-b-4 border-gray-800 pb-4 mb-4 flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">{data.personalInfo.fullName}</h1>
                <p className="text-gray-600 font-medium">{data.personalInfo.email} · {data.personalInfo.phone}</p>
            </div>
            <div className="text-right text-xs max-w-[200px] text-gray-500">
                {data.aiSummary?.slice(0, 150)}...
            </div>
        </header>

        <div className="grid grid-cols-2 gap-6">
            <div>
                <h2 className="font-bold text-gray-900 border-b border-gray-300 mb-2">EXPERIENCE</h2>
                {data.experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                        <div className="font-bold text-xs">{exp.company}</div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="italic">{exp.role}</span>
                            <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-tight">{exp.description}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="font-bold text-gray-900 border-b border-gray-300 mb-2">SKILLS</h2>
                <div className="flex flex-wrap gap-1 mb-4">
                    {data.skills.map((s, i) => (
                        <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold text-gray-600">{s}</span>
                    ))}
                </div>

                <h2 className="font-bold text-gray-900 border-b border-gray-300 mb-2">EDUCATION</h2>
                {data.education.map((edu, i) => (
                    <div key={i} className="mb-2">
                        <div className="font-bold text-xs">{edu.school}</div>
                        <div className="text-xs text-gray-500">{edu.degree}</div>
                    </div>
                ))}
            </div>
        </div>
    </ResumePage>
);

export const DesignerTemplate = ({ data }: { data: ResumeData }) => (
    <ResumePage className="font-sans text-gray-900 p-0 bg-white flex">
        <aside className="w-1/3 bg-gray-900 text-white p-8 flex flex-col justify-between h-full min-h-[297mm]">
            <div>
                <h1 className="text-3xl font-bold leading-none mb-6 text-yellow-500">{data.personalInfo.fullName?.split(' ').map((n, i) => <div key={i}>{n}</div>)}</h1>

                <div className="mb-8 text-sm opacity-80">
                    <div className="mb-1">{data.personalInfo.email}</div>
                    <div className="mb-1">{data.personalInfo.phone}</div>
                    <div>{data.personalInfo.location}</div>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-yellow-500 mb-4 tracking-widest text-xs uppercase">Skills</h3>
                    <div className="space-y-2">
                        {data.skills.map((skill, i) => (
                            <div key={i} className="text-sm border-b border-gray-700 pb-1">{skill}</div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>

        <main className="w-2/3 p-8">
            {data.aiSummary && (
                <div className="mb-10 text-lg leading-relaxed font-light">
                    {data.aiSummary}
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Experience
                </h2>
                <div className="space-y-6">
                    {data.experience.map((exp, i) => (
                        <div key={i}>
                            <h3 className="font-bold text-lg">{exp.role}</h3>
                            <div className="text-gray-500 text-sm mb-2">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                            <p className="text-gray-700">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    </ResumePage>
);
