const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const { getToken } = require("../services/tokenService");
const mongoose = require("mongoose");
const TimeTableModel = require("../models/TimeTableModel");
const { changeStatus } = require("./lessonService");


const days = [
    {
        name: "monday",
        value: 1
    },
    {
        name: "tuesday",
        value: 2
    },
    {
        name: "wednesday",
        value: 3
    },
    {
        name: "thursday",
        value: 4
    },
    {
        name: "friday",
        value: 5
    },
    {
        name: "saturday",
        value: 6
    },
    {
        name: "sunday",
        value: 0
    }
]
const saveCalendar = async (calendar) => {
    let newDate = new Date(calendar.startDate);
    let endDate = new Date(calendar.endDate);
    let result = [];
    while (newDate.getTime() < endDate.getTime()) {
        let keys = Object.keys(calendar);
        const scheduleDays = days.filter(d => keys.includes(d.name));
        for (let i = 0; i < scheduleDays.length; i++) {
            if (newDate.getDay() === scheduleDays[i].value) {
                const newDay = new TimeTableModel({
                    day: scheduleDays[i].name,
                    time: calendar[scheduleDays[i].name],
                    date: newDate.toISOString().substring(0, 10),
                    training_id: calendar.training_id
                });
                const saved = await newDay.save();
                result.push(saved);
            }
        }
        newDate = new Date(newDate.getTime() + 24 * 60 * 60 * 1000)
    }

    const changedStatus = await changeStatus(calendar.training_id, "Хуваарь оруулсан");
    
    return {
        code: 200,
        data: {
            timeTable: result,
            training_id: calendar.training_id,
            changedStatus: changedStatus
        },
    };
};


module.exports = {
    saveCalendar
};
