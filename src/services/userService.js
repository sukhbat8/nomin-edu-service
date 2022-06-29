const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const { getToken } = require("../services/tokenService");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");
const TeacherModel = require("../models/TeacherModel");
const ManagerModel = require("../models/ManagerModel");
const StudentModel = require("../models/StudentModel");

const loginUser = async (loginInfo) => {
    const user = await UserModel.findOne({ email: loginInfo.email, type: loginInfo.type });
    if (!user) {
        return {
            code: 500,
            data: "Нэвтрэх нэр эсвэл нууц үг буруу байна!",
        };
    }
    const validate = await bcrypt.compare(loginInfo.password, user.password);

    if (!validate) {
        return {
            code: 500,
            data: "Нэвтрэх нэр эсвэл нууц үг буруу байна!",
        };
    }

    const token = await getToken(
        {
            userId: user._id,
            email: loginInfo.email,
        },
        {
            expiresIn: "1h",
        }
    );
    return { code: 200, data: token };
};


const saveUser = async (registerInfo) => {
    const user = await UserModel.findOne({ email: registerInfo.email });

    if (user) {
        return {
            code: 500,
            data: "Цахим шуудан бүртгэгдсэн байна.",
        };
    }

    const hp = await generatePassword(registerInfo.password);
    try {
        const newUser = new UserModel({
            email: registerInfo.email,
            password: hp,
            createdDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            lastName: registerInfo.lastname,
            firstName: registerInfo.firstname,
            type: registerInfo.type
        });

        const savedUser = await newUser.save();
        let t = null;
        if (savedUser.type == 1) {
            t = await saveTeacher({
                user_id: savedUser._id,
                type: registerInfo.teacherType,
                lessons_id: registerInfo.lessons_id
            });
        } else if (savedUser.type == 3) {
            await saveStudent({
                user_id: savedUser._id,
            }
            );
        } else {
            await saveManager({
                user_id: savedUser._id,
            });
        }
        return {
            code: 200,
            data: {
                email: savedUser.email,
            },
        };
    } catch (err) {
        return { code: 500, data: "Бүртгэхэд алдаа гарлаа" };
    }
};
const saveStudent = async (data) => {
    try {
        const newUser = new StudentModel({
            user_id: data.user_id,
        });

        const savedStudent = await newUser.save();
        return {
            code: 200,
            data: {
                ...savedStudent.doc
            },
        };
    } catch (err) {
        return { code: 500, data: "Бүртгэхэд алдаа гарлаа" };
    }
}
const saveManager = async (data) => {
    try {
        const newUser = new ManagerModel({
            user_id: data.user_id,
        });

        const savedManager = await newUser.save();
        return {
            code: 200,
            data: {
                ...savedManager.doc
            },
        };
    } catch (err) {
        return { code: 500, data: "Бүртгэхэд алдаа гарлаа" };
    }
}

const saveTeacher = async (data) => {
    try {
        const teacher = new TeacherModel(data);
        const savedTeacher = await teacher.save();
        return {
            code: 200,
            data: savedTeacher,
        };
    } catch (err) {
        return { code: 500, data: "Бүртгэхэд алдаа гарлаа" };
    }
};


const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
const getIndividualById = async (user_id) => {
    const individual = await UserModel.findById(user_id);
    return individual;
};
const getUserInfo = async (user) => {
    const individual = await getIndividualById(user.userId);
    if (!individual) {
        return {
            code: 200,
            data: null,
        };
    }

    return {
        code: 200,
        data: {
            ...individual._doc,
            email: user.email,
        },
    };
};

module.exports = {
    loginUser,
    saveUser,
    getUserInfo
};
