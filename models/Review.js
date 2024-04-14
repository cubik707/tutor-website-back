import mongoose, {Schema} from "mongoose";

const ReviewSchema = new mongoose.Schema({ //Свойства схемы отзыва
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tutor: {
        type: Schema.Types.ObjectId,
        ref: 'Tutor',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Review', ReviewSchema);