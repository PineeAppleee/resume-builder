import React from 'react';
import { ResumeData } from '../ResumeContext';

export const ProfessionalTemplate = ({ data }: { data: ResumeData }) => {
    return (
        <div className="h-full bg-white text-gray-800 p-8 font-sans" style={{ minHeight: '1000px' }}>
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">
                    {data.personalInfo.fullName || 'Your Name'}
                </h1>
                <div className="text-lg text-gray-600 mt-2 font-medium tracking-wider uppercase">
                    {data.title || 'Professional Title'}
                </div>

                <div className="flex flex-wrap gap-4 text-sm mt-4 text-gray-600">
                    {data.personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <span>📧</span> {data.personalInfo.email}
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <span>📱</span> {data.personalInfo.phone}
                        </div>
                    )}
                    {data.personalInfo.location && (
                        <div className="flex items-center gap-1">
                            <span>📍</span> {data.personalInfo.location}
                        </div>
                    )}
                    {data.personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <span>🔗</span> <a href={data.personalInfo.linkedin} className="hover:underline">LinkedIn</a>
                        </div>
                    )}
                    {data.personalInfo.portfolio && (
                        <div className="flex items-center gap-1">
                            <span>🌐</span> <a href={data.personalInfo.portfolio} className="hover:underline">Portfolio</a>
                        </div>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Column (Main Content) */}
                <div className="col-span-8 space-y-8">
                    {data.aiSummary && (
                        <section>
                            <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-3 text-gray-800">
                                Professional Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                {data.aiSummary}
                            </p>
                        </section>
                    )}

                    {data.experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4 text-gray-800">
                                Work Experience
                            </h2>
                            <div className="space-y-6">
                                {data.experience.map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                                            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
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
                            <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-4 text-gray-800">
                                Key Projects
                            </h2>
                            <div className="space-y-4">
                                {data.projects.map(proj => (
                                    <div key={proj.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                            {proj.link && (
                                                <a href={proj.link} className="text-xs text-blue-600 hover:underline">
                                                    View Project ↗
                                                </a>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 mb-1 font-mono">{proj.techStack}</div>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {proj.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar) */}
                <div className="col-span-4 space-y-8">
                    {data.skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-2 mb-3 text-gray-800">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-gray-300 pb-2 mb-3 text-gray-800">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map(edu => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-gray-900 text-sm">{edu.school}</h3>
                                        <div className="text-sm text-gray-800">{edu.degree}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {edu.startDate} – {edu.endDate}
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
