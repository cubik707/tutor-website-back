import express from 'express'; //Подключение express
import mongoose from "mongoose"; //Подключение mongoose

import {loginValidation, registerValidation} from './validations/authValidation.js'
import checkAuth from './utils/checkAuth.js'
import {reviewCreateValidation} from "./validations/reviewValidation.js";

import * as UserController from "./controllers/UserControler.js";
import * as ReviewController from "./controllers/ReviewControler.js";
import * as TutorController from "./controllers/TutorController.js"
import {tutorCreateValidation} from "./validations/tutorValidation.js";



mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err)); // Подключение к БД

const app = express(); //Создание express приложения

app.use(express.json()); //Чтение файлов JSON с помощью express

app.get('/', (req, res) => {
    res.send('HelloWorld');
});

app.post('/auth/register',registerValidation , UserController.register);
app.post('/auth/login', loginValidation, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/auth/tutor', checkAuth, tutorCreateValidation, TutorController.createTutor);

app.get('/reviews', ReviewController.getAll);
// app.get('/reviews/:id', ReviewController.getOne);
app.post('/reviews', checkAuth, reviewCreateValidation, ReviewController.create);
// app.delete('/reviews', ReviewController.remove);
// app.patch('/reviews', ReviewController.update);

app.listen(4444, (err) => { //Запуск сервера
    if (err) {
        return console.log(err);
    }
    console.log('Server OK')
});