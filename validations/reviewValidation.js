import {body} from "express-validator";

export const reviewCreateValidation = [
    body('rating', 'Введите рейтинг').isInt({ min: 1, max: 5 }),
    body('comment', 'Введите комментарий к отзыву').optional().isString(),
]