import express from 'express'; //Подключение express
import jwt from 'jsonwebtoken'; //Подключение jsonwebtoken
import bcrypt from 'bcrypt';
import mongoose from "mongoose"; //Подключение mongoose
import {validationResult} from "express-validator";

import {registerValidation} from './validations/auth.js'

import UserModel from './models/User.js'

mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err)); // Подключение к БД

const app = express(); //Создание express приложения

app.use(express.json()); //Чтение файлов JSON с помощью express

app.get('/', (req, res) => {
    res.send('HelloWorld');
});

app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    //Шифрование пароля
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save(); // C

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