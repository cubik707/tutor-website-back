import ReviewModel from "../models/Review.js";

export const getAll = async (req, res) => { // Получение всех отзывов
    try {
        //Получаем статьи, а также у юзера берем необходимые поля
        const reviews = await ReviewModel.find()
            .populate({
                path: 'user',
                select: ['fullName', 'avatarUrl', 'isAdmin']
            })
            .populate({
                path: 'tutorId',
                populate: {
                    path: 'user',
                    select: 'fullName'
                },
                select: 'fullName'
            })
            .exec();

        res.json(reviews);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить отзывы'
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const doc = await ReviewModel.findById(reviewId);

        if (!doc) {
            return res.status(404).json({
                message: 'Отзыв не найден'
            });
        }

        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить отзыв'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const doc = await ReviewModel.findByIdAndDelete({
            _id: reviewId
        })

        if (!doc) {
            return res.status(404).json({
                message: 'Отзыв не найден'
            });
        }

        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить отзыв'
        });
    }
}

export const create = async (req, res) => { // Создание отзыва
    try {
        const doc = new ReviewModel({
            rating: req.body.rating,
            comment: req.body.comment,
            user: req.userId,
            tutorId: req.body.tutorId,
        });

        // Сохраняем отзыв в базе данных
        const newReview = await doc.save();

        res.json(newReview);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать отзыв'
        });
    }
}

export const update = async (req, res) => {
    try {
        const reviewId = req.params.id;

        await ReviewModel.updateOne({
            _id: reviewId
        },{
            rating: req.body.rating,
            comment: req.body.comment,
        },)

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить отзыв'
        });
    }
}