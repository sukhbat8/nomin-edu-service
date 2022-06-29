const mongoose = require("mongoose");
const LessonModel = require("./LessonModel");
const UserModel = require("./UserModel");

const TeacherModel = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
    },
    lessons_id: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: LessonModel,
    },
});

module.exports = mongoose.model("teachers", TeacherModel);