import ReviewModel from "../models/Review.js";

export const create = async (req, res) => {
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