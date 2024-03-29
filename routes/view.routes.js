const {Router} = require('express');
const School = require('../models/School');
const Time = require('../models/Time');
const Classroom = require('../models/Classroom');
const Announcement = require('../models/Announcement');
const router = Router();

// /api/view/get/:school
router.get('/get/:id/:size', async (req, res) => {

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
        let session = '';
        let specialDates = time[0].special.dates
        let timeArr
        let timeForSend
        if (specialDates[specialDates.indexOf(date)]) {
            timeArr = time[0].special
            if (dateStr > timeArr.firstSpecialSession[timeArr.firstSpecialSession.length - 1].endTime) {
                session = 'secondSession';
                timeForSend = timeArr.secondSpecialSession
            } else {
                session = 'firstSession';
                timeForSend = timeArr.firstSpecialSession
            }
        } else {
            timeArr = time[0].time
            if (dateStr > timeArr.firstSession[timeArr.firstSession.length - 1].endTime) {
                session = 'secondSession';
                timeForSend = timeArr.secondSession
            } else {
                session = 'firstSession';
                timeForSend = timeArr.firstSession
            }
        }

        const classrooms = await Classroom.find({school: school.name}).sort({name: 1})
            .collation({locale: "en_US", numericOrdering: true})
        let nowIndexDay = new Date().getDay() - 1
        let editDate = new Date().toJSON().split('T')[0];
        let classroomsArr = []
        let count = 0;
        let emptySubject = {
            name: '',
            time: '',
            office: '',
            date: new Date(),
            update: false
        }
        for (const classroom of classrooms) {
            try {
                let arrSubjects = [];
                let subject;
                let classroomDay = classroom.days[nowIndexDay]
                if (classroomDay.session.value.indexOf(session) !== -1) {
                    let subSubjects = classroom.days[nowIndexDay].subjects.slice()
                    if (subSubjects.length < timeForSend.length) {
                        let subjectIndex = subSubjects.length + 1
                        while (timeForSend.length - subSubjects.length !== 0) {
                            subSubjects.push({...emptySubject, index: subjectIndex++})
                        }
                    }
                    classroomsArr.push({
                        name: classroom.name,
                        index: count++,
                        session: classroomDay.session,
                        day: classroomDay.day,
                        subjects: subSubjects
                    })

                }


                for (let i = 0; i < classroomDay.subjects.length; i++) {
                    let subDate = classroomDay.subjects[i].date.toJSON().split('T')[0];
                    if (subDate >= editDate) {
                        editDate = subDate;
                    }
                    if (classroomDay.subjects[i].update && (new Date() - classroomDay.subjects[i].date >= 3600000)) {
                        subject = {
                            _id: classroomDay.subjects[i]._id,
                            index: classroomDay.subjects[i].index,
                            name: classroomDay.subjects[i].name,
                            office: classroomDay.subjects[i].office,
                            date: new Date(),
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
        let indexClassroom = classroomsArr.length
        let subjectsClassroom = []
        const numberOfClass = req.params.size
        for (let i = 0; i < timeForSend.length; i++) {
            subjectsClassroom.push({...emptySubject, index: i + 1})
        }

        let subClassroomArr = []
        while (classroomsArr.length > 0){
            subClassroomArr.push(classroomsArr.splice(0, numberOfClass))
        }
        if(subClassroomArr.length < 2){
            subClassroomArr.push([])
        }
        while (subClassroomArr[subClassroomArr.length - 1].length < numberOfClass) {
                subClassroomArr[subClassroomArr.length - 1].push({
                    name: '-',
                    index: indexClassroom++,
                    day: subClassroomArr[0][0].day,
                    session: subClassroomArr[0][0].session,
                    subjects: subjectsClassroom
                })

        }

        res.json({
            classrooms: subClassroomArr,
            times: timeForSend,
            session: session,
            editDate: editDate,
            isDataReady: true,
            school: school.name
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

        res.json({announcements: announcementsText, isDataReady: true});


    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;