const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const { getToken } = require("../services/tokenService");
const mongoose = require("mongoose");
const TrainingModel = require("../models/TrainingModel");

const getTraining = async () => {
    try {
        const training = await TrainingModel.find().populate("teacher_id").populate("level_id").populate("lesson_id");
        return {
            code: 200,
            data: training,
        };
    } catch (err) {
        return {
            code: 500,
            data: {
                err: 'Мэдээлэл дамжуулахад алдаа гарлаа!'
            },
        };
    }
};

module.exports = {
    getTraining
};
