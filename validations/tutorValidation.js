import {body} from "express-validator";

export const tutorCreateValidation = [
    body('subjects', 'Укажите предметы, которые преподает репетитор').isArray().notEmpty(), // Проверка массива предметов
    body('pricePerHour', 'Укажите цену за час обучения').isNumeric().notEmpty(), // Проверка на число и непустоту цены за час
    body('location', 'Укажите местоположение репетитора').optional().isString(), // Проверка местоположения
    body('qualification', 'Укажите квалификацию репетитора').optional().isString(), // Проверка квалификации
    body('teachingFormat', 'Укажите формат обучения').isString().notEmpty(), // Проверка формата обучения
    body('description', 'Укажите описание репетитора').optional().isString(), // Проверка описания
    body('resume.experience', 'Укажите опыт работы репетитора').optional().isString(), // Проверка опыта
    body('resume.education', 'Укажите образование репетитора').optional().isString(), // Проверка образования
    body('certificates', 'Укажите сертификаты репетитора').optional().isArray(), // Проверка сертификатов
];