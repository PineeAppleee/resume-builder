import React from 'react';
import { ResumeData } from '../ResumeContext';

export const ModernTemplate = ({ data }: { data: ResumeData }) => {
    return (
        <div className="h-full bg-white text-gray-800 font-sans" style={{ minHeight: '1000px' }}>
            {/* Header with Background */}
            <header className="bg-primary text-primary-foreground p-8 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-widest">
                    {data.personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="text-xl mt-2 font-light opacity-90">
                    {data.title || 'Creative Professional'}
                </div>

                <div className="flex flex-wrap gap-4 text-sm mt-6 opacity-80">
                    {data.personalInfo.email && <span className='flex items-center gap-2'>✉️ {data.personalInfo.email}</span>}
                    {data.personalInfo.phone && <span className='flex items-center gap-2'>📞 {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span className='flex items-center gap-2'>📍 {data.personalInfo.location}</span>}
                </div>
            </header>

            <div className="px-8 pb-8 grid grid-cols-12 gap-8">
                {/* Left Column (Skills & Contact) */}
                <div className="col-span-4 space-y-8 border-r border-gray-100 pr-4">
                    <section>
                        <h2 className="text-lg font-bold text-primary uppercase mb-3">Links</h2>
                        <div className="flex flex-col gap-2 text-sm">
                            {data.personalInfo.linkedin && (
                                <a href={data.personalInfo.linkedin} className="text-blue-600 hover:underline">LinkedIn Profile</a>
                            )}
                            {data.personalInfo.portfolio && (
                                <a href={data.personalInfo.portfolio} className="text-blue-600 hover:underline">Portfolio</a>
                            )}
                        </div>
                    </section>

                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-primary uppercase mb-3">Skills</h2>
                            <div className="flex flex-col gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="bg-gray-100 px-3 py-2 rounded text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-primary uppercase mb-3">Education</h2>
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                        <div className="text-sm text-gray-600">{edu.degree}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {edu.startDate} – {edu.endDate}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Experience & Projects) */}
                <div className="col-span-8 space-y-8">
                    {data.aiSummary && (
                        <section className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
                            <h2 className="text-lg font-bold text-gray-900 uppercase mb-2">About Me</h2>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                {data.aiSummary}
                            </p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Experience</h2>
                            <div className="space-y-6">
                                {data.experience.map(exp => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-white"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {exp.startDate} – {exp.endDate}
                                            </span>
                                        </div>
                                        <div className="text-primary font-medium mb-2">{exp.company}</div>
                                        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Projects</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {data.projects.map(proj => (
                                    <div key={proj.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                            {proj.link && (
                                                <a href={proj.link} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20">
                                                    Link ↗
                                                </a>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">
                                            {proj.description}
                                        </p>
                                        <div className="text-xs text-gray-500 font-mono bg-gray-50 p-1 rounded inline-block">
                                            {proj.techStack}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};
