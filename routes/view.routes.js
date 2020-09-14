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
const SpecialDate = require('../models/SpecialDate');
const Announcement = require('../models/Announcement');
const router = Router();

// /api/view/get/:school
// /api/view/get/:school
router.get('/get/:id', async (req, res) => {

    try {

        const dayNum = new Date().getDay();
        let dayStr = [
            "понедельник",
            "вторник",
            "среда",
            "четверг",
            "пятница",
            "суббота",
            "воскресенье"
        ];
        const school = await School.findById(req.params.id);
        const specialDates = await SpecialDate.find({school: school.name});
        const specialDatesArr = Array.from(specialDates, date => {
            return date.date.toJSON().split('T')[0];
        });
        const specialDate = specialDatesArr[specialDatesArr.indexOf(new Date().toJSON().split('T')[0])];

        const time = await Time.find({school: school.name, special: specialDate});
        let date = new Date();
        let dateStr = date.getHours() + ':' + date.getMinutes();

        let session;


        if (dateStr > time[0].time[5].split('-')[1]) {
            session = 'second';
        } else {
            session = 'first';
        }


        const classrooms = await Classroom.find({
            school: school.name,
            day: dayStr[dayNum - 1],
            session: session
        }).sort({name: 1});

        for (const el of classrooms) {
            try {
                let arrSubjects = [];
                let subject;
                for (let i = 0; i < el.subjects.length; i++) {
                    if (el.subjects[i].update && (new Date() - el.date >= 3600000)) {
                        subject = {
                            _id: el.subjects[i]._id,
                            name: el.subjects[i].name,
                            time: el.subjects[i].time,
                            office: el.subjects[i].office,
                            update: false
                        };
                        arrSubjects.push(subject)
                    } else {
                        arrSubjects.push(el.subjects[i]);
                    }
                }
                await Classroom.findByIdAndUpdate({_id: el._id},
                    {
                        _id: el._id,
                        name: el.name,
                        session: el.session,
                        subjects: arrSubjects,
                        school: el.school,
                        day: el.day,
                        date: el.date
                    }
                );
            } catch (e) {
                console.log(e)
            }
        }

        let editDate = new Date().toJSON().split('T')[0];
        for (let i = 0; i < classrooms.length; i++) {
            try {
                let subDate = classrooms[i].date.toJSON().split('T')[0];
                if (subDate <= editDate) {
                    editDate = subDate;
                }
            } catch (e) {

            }
        }


        while (classrooms.length < 20) {
            classrooms.push({
                name: '', subjects: [
                    {name: '', update: false}, {name: '', update: false}, {name: '', update: false},
                    {name: '', update: false}, {name: '', update: false}, {name: '', update: false}
                ]
            });
        }
        res.json({classrooms: classrooms, times: time[0].time, session: classrooms.session, editDate: editDate});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/view/get_announcement/:id
router.get('/get_announcement/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        await Announcement.deleteMany({deleteDate: {$lte: new Date()}});
        const announcements = await Announcement.find({school: school.name});

        const announcementsText = Array.from(announcements, announcement => {
            return announcement.text;
        });

        res.json({announcements: announcementsText});


    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;