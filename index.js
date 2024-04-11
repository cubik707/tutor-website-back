import express from 'express'; //Подключение express
import jwt from 'jsonwebtoken'; //Подключение jsonwebtoken
import mongoose from "mongoose"; //Подключение mongoose
import {validationResult} from "express-validator";

import {registerValidation} from './validations/auth.js'

import UserModel from './models/User'

mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err)); // Подключение к БД

const app = express(); //Создание express приложения

app.use(express.json()); //Чтение файлов JSON с помощью express

app.get('/', (req, res) => {
    res.send('HelloWorld');
});

app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    res.json({
        success: true,
    });

    // console.log(req.body);
    //
    // if(req.body.email === "test@test.ru"){
    //     const token = jwt.sign({
    //             email: req.body.email,
    //             fullName: 'Влада Демидовец'
    //         },
    //         'secret123',
    //     );
    // }
    //
    // res.json({
    //     success: true,
    //     token,
    // });
});



app.listen(4444, (err) => { //Запуск сервера
    if (err) {
        return console.log(err);
    }
    console.log('Server OK')
});