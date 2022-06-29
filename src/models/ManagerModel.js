const mongoose = require("mongoose");
const UserModel = require("./UserModel");

const ManagerModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
    },
});

module.exports = mongoose.model("managers", ManagerModel);