import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ //Свойства схемы пользователя
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
        isAdmin: {
            type: Boolean,
            default: false // По умолчанию новый пользователь не является администратором
        }
    },
    {
        timestamps: true, //Прикручиваем дату создания к сущности
    },
);

export default mongoose.model('User', UserSchema);