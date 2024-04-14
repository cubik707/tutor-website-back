import {body} from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(), //Проверка валидации почты
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}), //Проверка валидации пароля
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(), //Проверка валидации почты
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}), //Проверка валидации пароля
    body('fullName', 'Укажите имя').isLength({min: 3}), //Проверка валидации имени
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(), //Проверка валидации аватара
]