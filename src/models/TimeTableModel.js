const mongoose = require("mongoose");
const TrainingModel = require("./TrainingModel");


const TimeTableModel = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    training_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: TrainingModel,
    },
});

module.exports = mongoose.model("timetables", TimeTableModel);