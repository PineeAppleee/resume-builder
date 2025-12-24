import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
    school: String,
    degree: String,
    startDate: String,
    endDate: String,
    description: String,
});

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    link: String,
    techStack: String,
});

const ExperienceSchema = new mongoose.Schema({
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    description: String,
});

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        default: 'My Resume',
    },
    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        linkedin: String,
        portfolio: String,
        location: String,
    },
    education: [EducationSchema],
    skills: [String],
    projects: [ProjectSchema],
    experience: [ExperienceSchema],
    aiSummary: String,
    themeColor: {
        type: String,
        default: '#000000',
    },
    template: {
        type: String,
        default: 'modern',
    },
    targetRole: {
        type: String,
        default: '',
    },
    experienceLevel: {
        type: String,
        enum: ['fresher', 'mid', 'senior'],
        default: 'mid',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
