import React from 'react';
import { ResumeData } from '../ResumeContext';

interface TemplateProps {
    data: ResumeData;
}

export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personalInfo, education, skills, experience, projects, themeColor } = data;

    return (
        <div className="w-full h-full p-8 bg-white text-slate-800 font-mono text-sm leading-relaxed">
            {/* Header */}
            <header className="border-b-2 border-slate-800 pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider mb-2" style={{ color: themeColor }}>
                    {personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap gap-4 text-xs">
                    {personalInfo.email && (
                        <span>EMAIL: {personalInfo.email}</span>
                    )}
                    {personalInfo.phone && (
                        <span>TEL: {personalInfo.phone}</span>
                    )}
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                            LINKEDIN
                        </a>
                    )}
                    {personalInfo.portfolio && (
                        <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                            GITHUB/WEB
                        </a>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6">
                {/* Main Column */}
                <div className="col-span-8 space-y-6">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 block">
                                <span className="bg-slate-100 pr-2 py-1">Experience</span>
                            </h2>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold">{exp.role}</h3>
                                            <span className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</span>
                                        </div>
                                        <div className="text-slate-600 font-semibold mb-1">{exp.company}</div>
                                        <div className="text-slate-700 whitespace-pre-wrap text-xs">
                                            {exp.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 block">
                                <span className="bg-slate-100 pr-2 py-1">Projects</span>
                            </h2>
                            <div className="space-y-4">
                                {projects.map((project) => (
                                    <div key={project.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold">{project.name}</h3>
                                            {project.link && (
                                                <a href={project.link} className="text-xs underline text-blue-600">Link</a>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 mb-1 font-semibold">{project.techStack}</p>
                                        <p className="text-slate-700 text-xs">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-6">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-base font-bold uppercase border-b border-slate-300 mb-3">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="bg-slate-100 px-2 py-1 text-xs border border-slate-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section>
                            <h2 className="text-base font-bold uppercase border-b border-slate-300 mb-3">
                                Education
                            </h2>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="font-bold text-sm">{edu.school}</div>
                                        <div className="text-xs">{edu.degree}</div>
                                        <div className="text-xs text-slate-500">{edu.startDate} - {edu.endDate}</div>
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
