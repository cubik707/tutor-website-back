import express from 'express'; //Подключение express
import mongoose from "mongoose"; //Подключение mongoose
import multer from "multer" // Для загрузки картинок на сервер

import {
    loginValidation,
    registerValidation,
    reviewCreateValidation,
    tutorCreateValidation} from './validations/validations.js'
import {UserController, ReviewController, TutorController} from "./controllers/index.js";
import {handleValidationError, checkAuth} from "./utils/index.js";



mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err)); // Подключение к БД

const app = express(); //Создание express приложения

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({storage});

app.use(express.json()); //Чтение файлов JSON с помощью express
app.use('/upload', express.static('uploads')); // Возвращение статических файлов


//Авторизация и регистрация
app.post('/auth/register', registerValidation, handleValidationError, UserController.register);
app.post('/auth/login', loginValidation, handleValidationError, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`,
    })
})

//Работа с репетиторами
app.post('/auth/tutor', checkAuth, tutorCreateValidation, TutorController.createTutor);

//CRUD для работы с отзывами
app.get('/reviews', ReviewController.getAll);
app.get('/reviews/:id', ReviewController.getOne);
app.post('/reviews', checkAuth, reviewCreateValidation, handleValidationError, ReviewController.create);
app.delete('/reviews/:id', checkAuth, ReviewController.remove);
app.patch('/reviews/:id', checkAuth, reviewCreateValidation, handleValidationError, ReviewController.update);

//Запуск сервера
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK')
});