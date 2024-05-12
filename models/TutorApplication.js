import mongoose, {Schema} from "mongoose";

const TutorApplicationSchema = new mongoose.Schema({ //Свойства схемы репетитора
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
        rating: {
            type: Number,
            default: 0
        },
        qualification: String,
        teachingFormat: {
            type: String,
            required: true
        },

        description: String,
        resume: {
            experience: String,
            education: String
        },
        certificates: [String],
    }
);
export default mongoose.model('TutorApplication', TutorApplicationSchema);