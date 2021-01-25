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

        const time = await Time.find({school: school.name});
        let nowDate = new Date();
        let nowMonth = (nowDate.getMonth() + '').length < 2 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1
        let nowDay = (nowDate.getDate() + '').length < 2 ? `0${nowDate.getDate() + 1}` : nowDate.getDate()
        let date = `${nowDate.getFullYear()}/${nowMonth}/${nowDay}`;
        let dateStr = nowDate.getHours() + ':' + nowDate.getMinutes();
        let session;
        let specialDates = time[0].special.dates
        let timeArr
        if (specialDates[specialDates.indexOf(date)]) {
            timeArr = time[0].special
            if (dateStr > timeArr.firstSpecialSession[timeArr.firstSpecialSession.length - 1].endTime) {
                session = 'secondSpecialSession';
            } else {
                session = 'firstSpecialSession';
            }
        } else {
            timeArr = time[0].time
            if (dateStr > timeArr.firstSession[timeArr.firstSession.length - 1].endTime) {
                session = 'secondSession';
            } else {
                session = 'firstSession';
            }
        }

        const classrooms = await Classroom.find({
            school: school.name,
        });
        let nowIndexDay = new Date().getDay()
        let editDate = new Date().toJSON().split('T')[0];
        let classroomsArr = []
        for (const classroom of classrooms) {
            try {
                let arrSubjects = [];
                let subject;
                let classroomDay = classroom.days[nowIndexDay]
                if(classroomDay.session.value.indexOf(session) !== -1){
                    console.log(classroomDay)
                    classroomsArr.push({
                        name: classroom.name,
                        session: classroomDay.session,
                        day: classroomDay.day,
                        subjects: classroomDay.subjects
                    })
                }
                for (let i = 0; i < classroomDay.subjects.length; i++) {
                    let subDate = classroomDay.subjects[i].date.toJSON().split('T')[0];
                    if (subDate <= editDate) {
                        editDate = subDate;
                    }
                    if (classroomDay.subjects[i].update && (new Date() - classroomDay.subjects[i].date >= 3600000)) {
                        subject = {
                            _id: classroomDay.subjects[i]._id,
                            index: classroomDay.subjects[i].index,
                            name: classroomDay.subjects[i].name,
                            time: classroomDay.subjects[i].time,
                            office: classroomDay.subjects[i].office,
                            update: false
                        };
                        arrSubjects.push(subject)
                    } else {
                        arrSubjects.push(classroomDay.subjects[i]);
                    }
                }
                let classDay = {
                    session: classroomDay.session,
                    day: classroomDay.day,
                    subjects: arrSubjects
                }
                let classDays = classroom.days
                classDays.splice(nowIndexDay, 1, classDay)
                await Classroom.findByIdAndUpdate({_id: classroom._id},
                    {
                        _id: classroom._id,
                        name: classroom.name,
                        school: classroom.school,
                        days: classDays
                    }
                );
            } catch (e) {
                console.log(e)
            }
        }


        res.json({
            classrooms: classroomsArr,
            times: timeArr,
            session: session,
            editDate: editDate,
            isReady: true
        });

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