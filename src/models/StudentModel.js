const mongoose = require("mongoose");
const UserModel = require("./UserModel");

const StudentModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
    },
});

module.exports = mongoose.model("students", StudentModel);