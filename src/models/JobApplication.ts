import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
    },
    role: {
        type: String,
        required: [true, 'Please provide a role'],
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    dateApplied: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
