const mongoose = require("mongoose");
const LevelModel = require("../models/LevelModel");
const LessonModel = require("../models/LessonModel");
const TeacherModel = require("../models/TeacherModel");
const UserModel = require("../models/UserModel");
const TrainingModel = require("../models/TrainingModel");

const getLessons = async () => {
    const levels = await LessonModel.find();
    return {
        code: 200,
        data: levels,
    };
};

const getLevels = async () => {
    const levels = await LevelModel.find();
    return {
        code: 200,
        data: levels,
    };
};
const getTeachers = async (lesson_id) => {
    const teachers = await TeacherModel.find({ lessons_id: lesson_id }).populate('user_id').populate('lessons_id');

    return {
        code: 200,
        data: teachers
    };
};
const saveLessons = async (data) => {
    try {
        const newLessons = new TrainingModel(data);
        const savedLessons = await newLessons.save();
        return {
            code: 200,
            data: savedLessons
        };
    } catch (err) {
        return { code: 500, data: "Бүртгэхэд алдаа гарлаа" };
    }
};
const changeStatus = async (training_id, status) => {
    try {
        const training = await TrainingModel.findByIdAndUpdate(training_id, {
            status: status
        });
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}


module.exports = {
    getLessons,
    getLevels,
    getTeachers,
    saveLessons,
    changeStatus
};
