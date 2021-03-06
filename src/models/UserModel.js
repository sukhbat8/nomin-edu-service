const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("users", UserModel);