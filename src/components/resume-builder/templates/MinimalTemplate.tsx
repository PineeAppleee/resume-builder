import React from 'react';
import { ResumeData } from '../ResumeContext';

export const MinimalTemplate = ({ data }: { data: ResumeData }) => {
    return (
        <div className="h-full bg-white text-black p-12 font-serif" style={{ minHeight: '1000px' }}>
            {/* Centered Header */}
            <header className="text-center mb-12">
                <h1 className="text-3xl font-normal uppercase tracking-widest mb-4">
                    {data.personalInfo.fullName || 'Your Name'}
                </h1>

                <div className="text-sm text-gray-600 flex justify-center gap-4 separator flex-wrap">
                    {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                </div>
                <div className="text-sm text-gray-600 mt-2 flex justify-center gap-4">
                    {data.personalInfo.linkedin && <a href={data.personalInfo.linkedin} className="border-b border-gray-400 hover:border-black">LinkedIn</a>}
                    {data.personalInfo.portfolio && <a href={data.personalInfo.portfolio} className="border-b border-gray-400 hover:border-black">Portfolio</a>}
                </div>
            </header>

            <div className="space-y-8 max-w-3xl mx-auto">
                {data.aiSummary && (
                    <section>
                        <p className="text-sm text-gray-800 italic leading-relaxed text-center max-w-2xl mx-auto border-b border-gray-100 pb-8">
                            "{data.aiSummary}"
                        </p>
                    </section>
                )}

                {data.skills.length > 0 && (
                    <section className="text-center border-b border-black pb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Core Competencies</h2>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                            {data.skills.map((skill, i) => (
                                <span key={i}>{skill}</span>
                            ))}
                        </div>
                    </section>
                )}

                {data.experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Experience</h2>
                        <div className="space-y-8">
                            {data.experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="font-bold text-lg">{exp.company}</h3>
                                        <span className="text-sm font-serif italic text-gray-600">
                                            {exp.startDate} – {exp.endDate}
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold uppercase tracking-wide mb-2 text-gray-800">{exp.role}</div>
                                    <p className="text-sm text-gray-800 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.projects.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Projects</h2>
                        <div className="space-y-6">
                            {data.projects.map(proj => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold">{proj.name}</h3>
                                        {proj.link && <a href={proj.link} className="text-xs border-b border-gray-300">Link</a>}
                                    </div>
                                    <p className="text-sm text-gray-800 mb-1">
                                        {proj.description}
                                    </p>
                                    <div className="text-xs text-gray-500 italic">Built with: {proj.techStack}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {data.education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black pb-2">Education</h2>
                        <div className="space-y-4">
                            {data.education.map(edu => (
                                <div key={edu.id} className="flex justify-between items-baseline">
                                    <div>
                                        <h3 className="font-bold">{edu.school}</h3>
                                        <div className="text-sm">{edu.degree}</div>
                                    </div>
                                    <span className="text-sm font-serif italic text-gray-600">
                                        {edu.startDate} – {edu.endDate}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
