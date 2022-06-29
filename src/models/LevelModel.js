const mongoose = require("mongoose");
const LessonModel = require("./LessonModel");

const LevelModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: LessonModel,
    },
});

module.exports = mongoose.model("levels", LevelModel);