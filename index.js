import express from 'express'; //Подключение express
import mongoose from "mongoose"; //Подключение mongoose

import {loginValidation, registerValidation} from './validations/authValidation.js'
import checkAuth from './utils/checkAuth.js'
import {getMe, login, register} from "./controllers/UserControler.js";

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err)); // Подключение к БД

const app = express(); //Создание express приложения

app.use(express.json()); //Чтение файлов JSON с помощью express

app.get('/', (req, res) => {
    res.send('HelloWorld');
});

app.post('/auth/login', loginValidation, register);
app.post('/auth/register', registerValidation, login);
app.get('/auth/me', checkAuth, getMe)

app.listen(4444, (err) => { //Запуск сервера
    if (err) {
        return console.log(err);
    }
    console.log('Server OK')
});