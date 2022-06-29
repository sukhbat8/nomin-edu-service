const mongoose = require("mongoose");

const LessonModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("lessons", LessonModel);