import mongoose, {Schema} from "mongoose";

const ReviewSchema = new mongoose.Schema({ //Свойства схемы отзыва
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tutorId: {
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
},
    {
        timestamps: true, //Прикручиваем дату создания к сущности
    },
);

export default mongoose.model('Review', ReviewSchema);