import React from 'react';
import { ResumeData } from '../ResumeContext';
import { ResumePage } from '../ResumePage';

export const MinimalTemplate = ({ data }: { data: ResumeData }) => {
    return (
        <ResumePage className="bg-white text-black p-12 font-serif leading-normal box-border">
            {/* Header: Centered Block */}
            <header className="text-center mb-10 border-b-0 pb-0">
                <h1 className="text-3xl font-bold uppercase tracking-[0.2em] mb-4 text-black" style={{ fontFamily: 'Times New Roman, serif' }}>
                    {data.personalInfo.fullName || 'Your Name'}
                </h1>

                <div className="text-sm text-gray-700 mb-3" style={{ lineHeight: '1.6' }}>
                    {/* Inline-block for contact pills to avoid flex */}
                    {data.personalInfo.email && (
                        <span className="inline-block mx-2 border-b border-transparent">
                            {data.personalInfo.email}
                        </span>
                    )}
                    {data.personalInfo.phone && (
                        <span className="inline-block mx-2 border-b border-transparent">
                            {data.personalInfo.phone}
                        </span>
                    )}
                    {data.personalInfo.location && (
                        <span className="inline-block mx-2 border-b border-transparent">
                            {data.personalInfo.location}
                        </span>
                    )}
                </div>

                <div className="text-sm text-gray-700" style={{ lineHeight: '1.6' }}>
                    {data.personalInfo.linkedin && (
                        <a href={data.personalInfo.linkedin} target="_blank" rel="noreferrer" className="inline-block mx-2 text-black border-b border-gray-400 no-underline hover:border-black">
                            LinkedIn
                        </a>
                    )}
                    {data.personalInfo.portfolio && (
                        <a href={data.personalInfo.portfolio} target="_blank" rel="noreferrer" className="inline-block mx-2 text-black border-b border-gray-400 no-underline hover:border-black">
                            Portfolio
                        </a>
                    )}
                </div>
            </header>

            <div className="max-w-none mx-auto print:max-w-none">
                {/* Summary */}
                {data.aiSummary && (
                    <section className="mb-8 block">
                        <p className="text-sm text-gray-900 italic leading-relaxed text-center mx-auto border-b border-gray-200 pb-8 px-8">
                            "{data.aiSummary}"
                        </p>
                    </section>
                )}

                {/* Skills: Centered inline-blocks */}
                {data.skills.length > 0 && (
                    <section className="text-center border-b border-black pb-6 mb-8 block">
                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-4 text-black block">Core Competencies</h2>
                        <div className="text-center leading-loose">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="inline-block mx-3 text-sm font-medium text-gray-800">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience: Table-like layout using Floats (or Tables) */}
                {/* Going with specific CLEARFIX blocks to simulate rows */}
                {data.experience.length > 0 && (
                    <section className="mb-8 block">
                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-6 border-b border-black pb-2 text-black block">Experience</h2>
                        <div>
                            {data.experience.map((exp, i) => (
                                <div key={i} className="mb-6 break-inside-avoid relative block clearfix">
                                    {/* Row 1: Company (Left) + Date (Right) */}
                                    <div className="mb-1 block overflow-hidden">
                                        <div className="float-left max-w-[70%]">
                                            <h3 className="font-bold text-lg text-black leading-tight">
                                                {exp.company}
                                            </h3>
                                        </div>
                                        <div className="float-right text-right">
                                            <span className="text-sm font-serif italic text-gray-600 block">
                                                {exp.startDate} – {exp.endDate}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Row 2: Role */}
                                    <div className="text-sm font-bold uppercase tracking-wide mb-2 text-gray-700 block clear-both">
                                        {exp.role}
                                    </div>

                                    {/* Description */}
                                    <div className="text-sm text-gray-900 leading-relaxed text-justify block clear-both">
                                        {exp.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects.length > 0 && (
                    <section className="mb-8 block">
                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-6 border-b border-black pb-2 text-black block">Projects</h2>
                        <div>
                            {data.projects.map((proj, i) => (
                                <div key={i} className="mb-5 break-inside-avoid block">
                                    <div className="mb-1 block overflow-hidden">
                                        <div className="float-left">
                                            <h3 className="font-bold text-base text-black">
                                                {proj.name}
                                            </h3>
                                        </div>
                                        <div className="float-right">
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs border-b border-gray-400 text-gray-800 no-underline">
                                                    View Project
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-900 mb-1 text-justify block clear-both leading-relaxed">
                                        {proj.description}
                                    </div>
                                    <div className="text-xs text-gray-600 italic block mt-1">
                                        Tech Stack: <span className="font-medium">{proj.techStack}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education.length > 0 && (
                    <section className="block">
                        <h2 className="text-xs font-bold uppercase tracking-[0.15em] mb-6 border-b border-black pb-2 text-black block">Education</h2>
                        <div>
                            {data.education.map((edu, i) => (
                                <div key={i} className="mb-4 break-inside-avoid block overflow-hidden">
                                    {/* School (Left) + Date (Right) in one float row */}
                                    <div className="float-left max-w-[75%]">
                                        <h3 className="font-bold text-base text-black">{edu.school}</h3>
                                        <div className="text-sm text-gray-800 mt-0.5">{edu.degree}</div>
                                    </div>
                                    <div className="float-right text-right">
                                        <span className="text-sm font-serif italic text-gray-600">
                                            {edu.startDate} – {edu.endDate}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </ResumePage>
    );
};
