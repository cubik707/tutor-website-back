import express from 'express'; //Подключение express
import jwt from 'jsonwebtoken'; //Подключение jsonwebtoken

const app = express(); //Создание express приложения

app.use(express.json()); //Чтение файлов JSON с помощью express

app.get('/', (req,res) => {
    res.send('HelloWorld');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);
    res.json({
        success: true
    });
});

app.listen(4444, (err) => { //Запуск сервера
    if (err) {
        return console.log(err);
    }
    console.log('Server OK')
});