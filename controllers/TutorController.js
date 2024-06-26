import TutorModel from "../models/Tutor.js"


export const createTutor = async (req, res) => {
    try {
        const doc = new TutorModel({
            user: req.userId,
            subjects: req.body.subjects,
            pricePerHour: req.body.pricePerHour,
            location: req.body.location,
            // schedule: req.body.schedule,
            rating: req.body.rating,
            qualification: req.body.qualification,
            teachingFormat: req.body.teachingFormat,
            description: req.body.description,
            resume: req.body.resume,
            certificates: req.body.certificates,
        });

        const tutor = await doc.save();
        res.status(201).json(tutor);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать репетитора',
        });
    }
}

export const getAllTutors = async (req, res) => {
    try {
        const tutors = await TutorModel.find().populate({
            path: 'user',
            select: ['fullName', 'avatarUrl', 'isAdmin']
        }).exec();
        res.status(200).json(tutors);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить список репетиторов',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const tutorId = req.params.id;
        const doc = await TutorModel.findById(tutorId);

        if (!doc) {
            return res.status(404).json({
                message: 'Репетитор не найден'
            });
        }

        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить информацию о репетиторе'
        });
    }
}