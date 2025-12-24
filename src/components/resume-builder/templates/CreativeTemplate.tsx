import React from 'react';
import { ResumeData } from '../ResumeContext';

interface TemplateProps {
    data: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personalInfo, education, skills, experience, projects, themeColor } = data;

    return (
        <div className="w-full h-full bg-white text-slate-900 grid grid-cols-12 min-h-[297mm]">
            <div className="col-span-4 bg-slate-50 p-6 flex flex-col gap-6 border-r border-slate-200">
                <div className="flex flex-col gap-1">
                    <div className="w-24 h-24 rounded-full bg-slate-200 mb-4 mx-auto overflow-hidden border-4 border-white shadow-md">
                        {/* Placeholder for photo if we had one */}
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400 bg-slate-100">
                            {personalInfo.fullName.charAt(0)}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 text-sm text-center">
                    {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.portfolio && (
                        <a href={personalInfo.portfolio} className="text-blue-600 hover:underline block truncate">{personalInfo.portfolio}</a>
                    )}
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <section>
                        <h3 className="font-bold text-lg uppercase tracking-widest mb-4 text-center" style={{ color: themeColor }}>Skills</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-white rounded-full text-xs shadow-sm border border-slate-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section>
                        <h3 className="font-bold text-lg uppercase tracking-widest mb-4 text-center" style={{ color: themeColor }}>Education</h3>
                        <div className="space-y-4 text-center">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-bold">{edu.school}</div>
                                    <div className="text-sm">{edu.degree}</div>
                                    <div className="text-xs text-slate-500 mt-1">{edu.startDate} - {edu.endDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <div className="col-span-8 p-8 space-y-8">
                <header>
                    <h1 className="text-5xl font-black uppercase leading-tight mb-2" style={{ color: themeColor }}>
                        {personalInfo.fullName}
                    </h1>
                    <p className="text-xl text-slate-500 font-light tracking-widest uppercase">
                        {data.targetRole || 'Professional'}
                    </p>
                </header>

                <div className="w-20 h-2 bg-slate-900"></div>

                {/* Experience */}
                {experience.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                            Experimentation
                        </h2>
                        <div className="space-y-8 border-l-2 border-slate-100 pl-6 ml-2">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-100"></div>
                                    <h3 className="text-xl font-bold">{exp.role}</h3>
                                    <div className="text-slate-600 font-medium mb-2">{exp.company} | {exp.startDate} - {exp.endDate}</div>
                                    <p className="text-slate-700 leading-relaxed text-sm">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold uppercase mb-6">Selected Works</h2>
                        <div className="grid gap-6">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{project.name}</h3>
                                        {project.link && <a href={project.link} className="text-xs bg-slate-200 px-2 py-1 rounded hover:bg-slate-300 transition">View</a>}
                                    </div>
                                    <p className="text-xs font-mono text-slate-500 mb-2">{project.techStack}</p>
                                    <p className="text-sm text-slate-700">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
