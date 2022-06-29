const mongoose = require("mongoose");
const LessonModel = require("./LessonModel");
const LevelModel = require("./LevelModel");
const TeacherModel = require("./TeacherModel");

const TrainingModel = new mongoose.Schema({
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: LessonModel,
    },
    level_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: LevelModel,
    },
    payment: {
        type: String,
        required: true,
    },
    studentCount: {
        type: String,
        required: true,
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: TeacherModel,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("training", TrainingModel);