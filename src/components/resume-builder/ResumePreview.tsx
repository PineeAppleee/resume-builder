'use client';

import { useResume } from './ResumeContext';

export default function ResumePreview() {
    const { resumeData } = useResume();

    return (
        <div className="h-full bg-white text-black p-8 shadow-lg overflow-y-auto" style={{ minHeight: '1000px' }}>
            <div className="text-center border-b-2 border-primary pb-4 mb-4">
                <h1 className="text-3xl font-bold uppercase">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex justify-center gap-4 text-sm mt-2">
                    {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
                    {resumeData.personalInfo.phone && <span>| {resumeData.personalInfo.phone}</span>}
                    {resumeData.personalInfo.location && <span>| {resumeData.personalInfo.location}</span>}
                </div>
                <div className="flex justify-center gap-4 text-sm mt-1 text-primary underline">
                    {resumeData.personalInfo.linkedin && <a href={resumeData.personalInfo.linkedin}>LinkedIn</a>}
                    {resumeData.personalInfo.portfolio && <a href={resumeData.personalInfo.portfolio}>Portfolio</a>}
                </div>
            </div>

            {resumeData.skills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.skills.join(' • ')}
                    </div>
                </div>
            )}

            {resumeData.experience.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-2">Experience</h2>
                    {resumeData.experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between font-bold">
                                <span>{exp.company}</span>
                                <span>{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="italic mb-1">{exp.role}</div>
                            <p className="whitespace-pre-line text-sm">{exp.description}</p>
                        </div>
                    ))}
                </div>
            )}

            {resumeData.projects.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-2">Projects</h2>
                    {resumeData.projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <div className="flex justify-between font-bold">
                                <span>{proj.name}</span>
                                {proj.link && <a href={proj.link} className="text-blue-600 text-sm">Link</a>}
                            </div>
                            <p className="text-sm mb-1">{proj.description}</p>
                            <div className="text-xs text-muted-foreground">Tech: {proj.techStack}</div>
                        </div>
                    ))}
                </div>
            )}

            {resumeData.education.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b mb-2">Education</h2>
                    {resumeData.education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <div className="flex justify-between font-bold">
                                <span>{edu.school}</span>
                                <span>{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <div>{edu.degree}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
