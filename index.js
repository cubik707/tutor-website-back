import express from 'express'; //Подключение express
import mongoose from "mongoose"; //Подключение mongoose
import multer from "multer" // Для загрузки картинок на сервер
import cors from 'cors'

import {
    loginValidation,
    registerValidation,
    reviewCreateValidation,
    tutorCreateValidation} from './validations/validations.js'
import {UserController, ReviewController, TutorController, TutorApplicationController} from "./controllers/index.js";
import {handleValidationError, checkAuth} from "./utils/index.js";
import TutorApplication from "./models/TutorApplication.js";
import {deleteTutorApplication} from "./controllers/TutorApplicationControler.js";



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
app.use(cors());
app.use('/upload', express.static('uploads')); // Возвращение статических файлов


//Авторизация и регистрация
app.post('/auth/register', registerValidation, handleValidationError, UserController.register);
app.post('/auth/login', loginValidation, handleValidationError, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

//Управление пользователями
app.get('/users', checkAuth, UserController.getAll);
app.delete('/users/:id', checkAuth, UserController.remove);
app.patch('/users/:id', checkAuth, registerValidation, UserController.update);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`,
    })
})

//Работа с репетиторами
app.post('/tutors/create', checkAuth, tutorCreateValidation, TutorController.createTutor);
app.get('/tutors', TutorController.getAllTutors);
app.get('/tutors/:id', TutorController.getOne);

//Заявки на репетитора
app.post('/tutorApplication/create', checkAuth, tutorCreateValidation, TutorApplicationController.createTutorApplication);
app.get('/tutorApplication', checkAuth, TutorApplicationController.getAllTutorApplication);
app.delete('/tutorApplication/:id', checkAuth, TutorApplicationController.deleteTutorApplication);

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