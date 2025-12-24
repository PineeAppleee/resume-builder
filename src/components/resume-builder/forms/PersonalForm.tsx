'use client';

import { useResume } from '../ResumeContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PersonalForm() {
    const { resumeData, updateSection } = useResume();
    const { personalInfo } = resumeData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateSection('personalInfo', { ...personalInfo, [name]: value });
    };

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChange}
                        placeholder="New York, NY"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        name="linkedin"
                        value={personalInfo.linkedin}
                        onChange={handleChange}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <Input
                        id="portfolio"
                        name="portfolio"
                        value={personalInfo.portfolio}
                        onChange={handleChange}
                        placeholder="johndoe.com"
                    />
                </div>
            </div>
        </div>
    );
}
