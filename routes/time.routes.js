const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const DataSubject = require('../models/DataSubject');
const Table = require('../models/Table');
const DataClassroom = require('../models/DataClassroom');
const School = require('../models/School');
const User = require('../models/User');
const Time = require('../models/Time');
const Classroom = require('../models/Classroom');
const Director = require('../models/Director');
const SchoolYear = require('../models/SchoolYear');
const Ad = require('../models/Ad');
const SpecialDate = require('../models/SpecialDate');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'public/images/Ad'});
const router = Router();

// /api/time/add
router.post('/add', auth, async (req, res) => {
    try {
        const {isSpecial, lengthLesson, times, specialDates} = req.body;
        const user = await User.findById(req.user.userId);
        console.log("userSchool = ", user.school)
        console.log("user = ", user)
        const candidate = await Time.find({school: user.school});
        const subTime = {
            school: user.school,
            time: {
                firstSession: times.firstSession,
                secondSession: times.secondSession
            },
            special: {
                firstSpecialSession: times.specialFirstSession,
                secondSpecialSession: times.specialSecondSession,
                dates: specialDates
            }
        };
        if (candidate[0]) {
            const time = new Time({...subTime, _id: candidate[0]._id})
            //await Time.findByIdAndUpdate({_id: candidate[0]._id}, time);
            res.status(201).json({message: 'Данные изменены'})
        } else {
            const time = new Time(subTime)
            //await time.save();
            res.status(201).json({message: 'Добавлено'})
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '});
    }
});

// /api/time/get_data
router.get('/get_data', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const times = await Time.find({school: user.school});
        let minutes = []
        let sendData = {candidate: false}
        if (times.length > 0 ) {
            let getDate = string => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);
            let different = [
                (getDate(times[0].time.firstSession[0].endTime) - getDate(times[0].time.firstSession[0].startTime)),
                (getDate(times[0].time.secondSession[0].endTime) - getDate(times[0].time.secondSession[0].startTime)),
                (getDate(times[0].special.firstSpecialSession[0].endTime) - getDate(times[0].special.firstSpecialSession[0].startTime)),
                (getDate(times[0].special.secondSpecialSession[0].endTime) - getDate(times[0].special.secondSpecialSession[0].startTime))
            ]
            minutes = [
                Math.round(((different[0] % 86400000)) / 60000),
                Math.round(((different[1] % 86400000)) / 60000),
                Math.round(((different[2] % 86400000)) / 60000),
                Math.round(((different[3] % 86400000)) / 60000)
            ]

            sendData = {
                firstSession: times[0].time.firstSession,
                secondSession: times[0].time.secondSession,
                specialFirstSession: times[0].special.firstSpecialSession,
                specialSecondSession: times[0].special.secondSpecialSession,
                specialDates: times[0].special.dates,
                lengthLesson: minutes,
                candidate: true
            }
        }
        res.json(sendData)
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});
// /api/time/get_data/:id
router.get('/get_data/:id',async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        const times = await Time.find({school: school.name});
        let minutes = []
        let sendData = {candidate: false}
        if (times.length > 0 ) {
            let getDate = string => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);
            let different = [
                (getDate(times[0].time.firstSession[0].endTime) - getDate(times[0].time.firstSession[0].startTime)),
                (getDate(times[0].time.secondSession[0].endTime) - getDate(times[0].time.secondSession[0].startTime)),
                (getDate(times[0].special.firstSpecialSession[0].endTime) - getDate(times[0].special.firstSpecialSession[0].startTime)),
                (getDate(times[0].special.secondSpecialSession[0].endTime) - getDate(times[0].special.secondSpecialSession[0].startTime))
            ]
            minutes = [
                Math.round(((different[0] % 86400000)) / 60000),
                Math.round(((different[1] % 86400000)) / 60000),
                Math.round(((different[2] % 86400000)) / 60000),
                Math.round(((different[3] % 86400000)) / 60000)
            ]

            let specialDates = Array.from(times[0].special.dates, date => {
                let subDate = date.split('/')
                return `${subDate[2]}.${subDate[1]}.${subDate[0]}`
            })

            sendData = {
                firstSession: times[0].time.firstSession,
                secondSession: times[0].time.secondSession,
                specialFirstSession: times[0].special.firstSpecialSession,
                specialSecondSession: times[0].special.secondSpecialSession,
                specialDates: specialDates,
                lengthLesson: minutes,
                candidate: true
            }
        }
        res.json(sendData)
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;