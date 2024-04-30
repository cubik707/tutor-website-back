import {body} from "express-validator";
import TutorModel from "../models/Tutor.js"

export const reviewCreateValidation = [
    body('rating', 'Введите рейтинг').isInt({ min: 1, max: 5 }),
    body('comment', 'Введите комментарий к отзыву').optional().isString(),
    body('tutorId').custom(async (value) => { // Добавляем кастомную проверку для tutorId
        try {
            const tutor = await TutorModel.findById(value, null, { lean: true }); // Поиск репетитора по переданному id
            if (!tutor) { // Если репетитор не найден, выбрасываем ошибку
                throw new Error('Репетитор с указанным id не найден');
            }
            return true; // Если репетитор найден, возвращаем true
        } catch (error) {
            throw new Error('Ошибка при поиске репетитора');
        }
    }),
]