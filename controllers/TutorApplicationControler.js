import TutorApplicationModel from "../models/TutorApplication.js";

export const createTutorApplication = async (req, res) => {
    try {
        const doc = new TutorApplicationModel({
            user: req.userId,
            subjects: req.body.subjects,
            pricePerHour: req.body.pricePerHour,
            location: req.body.location,
            rating: req.body.rating,
            qualification: req.body.qualification,
            teachingFormat: req.body.teachingFormat,
            description: req.body.description,
            resume: req.body.resume,
            certificates: req.body.certificates,
        });

        const tutorApplication = await doc.save();
        res.status(201).json(tutorApplication);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать заявку на репетитора',
        });
    }
}

export const getAllTutorApplication = async (req, res) => {
    try {
        const tutorApplication = await TutorApplicationModel.find().populate({
            path: 'user',
            select: ['fullName', 'avatarUrl']
        }).exec();
        res.json(tutorApplication);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить запрос на репетиторство'
        });
    }
}


export const deleteTutorApplication = async (req, res) => {
    try {
        const applicationId = req.params.id; // Получаем идентификатор заявки из параметров запроса

        // Проверяем, существует ли заявка с данным идентификатором
        const application = await TutorApplicationModel.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Заявка не найдена' });
        }

        // Удаляем заявку
        await TutorApplicationModel.findByIdAndDelete(applicationId);

        res.json({ message: 'Заявка успешно удалена' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось удалить заявку на репетитора' });
    }
}
