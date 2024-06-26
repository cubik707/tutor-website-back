import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";
import ReviewModel from "../models/Review.js";


export const register = async (req, res) => {
    try {
        //Шифрование пароля
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save(); // Сохранение в БД

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d', //Срок жизни токена
            },
        );

        const {passwordHash, ... userData} = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегестрироваться',
        });
    }
}

export const login = async (req, res) =>{
    try {
        const user = await UserModel.findOne({ email: req.body.email});
        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d', //Срок жизни токена
            },
        );

        const {passwordHash, ... userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
}

export const getMe = async (req, res) =>{
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const {passwordHash, ... userData} = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
}

export const getAll = async (req, res) => { // Получение всех пользователей
    try {
        const users = await UserModel.find({ isAdmin: false }).exec();

        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить пользователей'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const userId = req.params.id;
        const doc = await UserModel.findByIdAndDelete({
            _id: userId
        })

        if (!doc) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить пользователя'
        });
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.params.id;

        await UserModel.updateOne({
            _id: userId
        },{
            fullName: req.body.fullName,
            email: req.body.email,
        },)

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить пользователя'
        });
    }
}