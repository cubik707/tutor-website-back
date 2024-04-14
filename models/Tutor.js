import mongoose, {Schema} from "mongoose";

const TutorSchema = new mongoose.Schema({ //Свойства схемы репетитора
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Ссылка на схему пользователя
            required: true
        },
        subjects: {
            type: [String],
            required: true
        },
        pricePerHour: {
            type: Number,
            required: true
        },
        location: String,
        schedule: {
            days: [String],
            startTime: String,
            endTime: String
        },
        rating: {
            type: Number,
            default: 0
        },
        qualification: String,
        teachingFormat: {
            type: String,
            required: true
        },
        videoUrl: String,
        description: String,
        resume: {
            experience: String,
            education: String
        },
        certificates: [String],
        videoPresentation: String,
    }
);

export default mongoose.model('Tutor', TutorSchema);