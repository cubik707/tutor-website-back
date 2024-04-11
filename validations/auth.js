import {body} from 'express-validator';

export const registerValidation = [
    body('email').isEmail(), //Проверка валидации почты
    body('password').isLength({min: 5}), //Проверка валидации пароля
    body('fullName').isLength({min: 3}), //Проверка валидации имени
    body('avatarUrl').optional().isURL(), //Проверка валидации аватара
]