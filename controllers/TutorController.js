import TutorModel from "../models/Tutor.js"

export const createTutor = async (req, res) => {
    try {
        const doc = new TutorModel({
            user: req.userId,
            subjects: req.body.subjects,
            pricePerHour: req.body.pricePerHour,
            location: req.body.location,
            schedule: req.body.schedule,
            rating: req.body.rating,
            qualification: req.body.qualification,
            teachingFormat: req.body.teachingFormat,
            videoUrl: req.body.videoUrl,
            description: req.body.description,
            resume: req.body.resume,
            certificates: req.body.certificates,
            videoPresentation: req.body.videoPresentation
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
