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
const router = Router();


// /api/table/add_time
router.post('/add_time', auth, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректный данные при добавлении времени'
            });
        }

        const {times} = req.body;

        const user = await User.findById(req.user.userId);

        /* let special;
         try {
             if(session.indexOf("special") !== -1){
                 special = req.body.date;
                 let specialDate = new SpecialDate({school: user.school, date: special});
                 await specialDate.save();
             }
         }catch (e) {
             console.log(e)
         }


        const newTimes = times.map((e) => {
            return [
                e.startTime1 + '-' + e.endTime1,
                e.startTime2 + '-' + e.endTime2,
                e.startTime3 + '-' + e.endTime3,
                e.startTime4 + '-' + e.endTime4,
                e.startTime5 + '-' + e.endTime5,
                e.startTime6 + '-' + e.endTime6
            ]
        });
        console.log(newTimes)

        const time = new Time({
            time: {firstSession: newTimes[0], secondSession: newTimes[1]},
            school: user.school,
            special: {firstSpecialSession: [], secondSpecialSession: [], date: []}
        });
        console.log(time)
        await time.save();
        */
        res.status(201).json({message: 'Время добавлено'})

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


// /api/table/subjects
router.post('/subject',
    [check('subjectName', 'Введите название предмета').exists()],
    auth,
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при добавлении предмета'
                });
            }


            const {subjectName} = req.body;

            /* const candidate = await DataSubject.findOne({name: subjectName});

             if (candidate) {
                 return res.status(400).json({message: 'Такой предмет уже добавлен'})
             }*/

            const user = await User.findById(req.user.userId);
            const subject = new DataSubject({name: subjectName, school: user.school});

            await subject.save();

            res.status(201).json({message: 'Предмет добавлен'})


        } catch (e) {
            //console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });


// /api/table/classroom
router.post('/classroom',
    auth,
    [check('classroomName', 'Введите название класса').exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req);


            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при добавлении класса'
                });
            }


            const {classroomName} = req.body;

            const user = await User.findById(req.user.userId);

            const classroom = new DataClassroom({name: classroomName, school: user.school});

            await classroom.save();

            res.status(201).json({message: 'Класс добавлен'})


        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });


// /api/table/get_subject
router.get('/get_subject', auth, async (req, res) => {
    try {
        const subjects = await DataSubject.find({school: req.user.school});
        res.json(subjects);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


// /api/table/add_school
router.post('/add_school',
    [check('schoolName', 'Введите название школы').isLength({min: 1})], auth,
    async (req, res) => {
        try {
            const errors = validationResult(req);


            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при добавлении школы'
                });
            }


            const {schoolName} = req.body;


            const candidate = await School.findOne({name: schoolName});

            if (candidate) {
                return res.status(400).json({message: 'Такая школа уже добавлен'})
            }

            const school = new DataClassroom({name: schoolName});


            await school.save();


            res.status(201).json({message: 'школа добавлен'})


        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
);

// /api/table/get_school
router.get('/get_school', async (req, res) => {
    try {
        const schools = await School.find({});
        const sub = {
            schools: Array.from(schools, schools => {
                return {value: schools.id, label: schools.name}
            })
        };
        res.json(sub);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/table/get_data_class/:classname
router.get('/get_data_class/:classname', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const candidate = await Classroom.find({name: req.params.classname, school: user.school});

        if (candidate.length > 0) {
            let daysArr = []
            for (let i = 0; i < candidate[0].days.length; i++) {
                daysArr.push({
                    classname: {
                        value: candidate[0].name,
                        label: candidate[0].name,
                        name: "classname"
                    }, session: candidate[0].days[i].session,
                    day: candidate[0].days[i].day,
                    subjects: Array.from(candidate[0].days[i].subjects, subject => {
                        return {
                            index: subject.index,
                            name: `subject-${subject.index}`,
                            office: subject.office,
                            time: subject.time,
                            option: {value: subject.name, label: subject.name, name: 'subject'}
                        }
                    })
                })
            }
            const prepareData = {
                name: candidate[0].name,
                school: candidate[0].school,
                days: daysArr
            }
            res.json({candidateData: prepareData, candidate: true});
        } else {
            res.json({candidate: false});
        }
    } catch (e) {
        console.log(e);
    }
});

// /api/table/editor
router.post('/editor', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);

        const {classname, form} = req.body

        const candidate = await Classroom.find({name: classname.value, school: user.school});
        let daysArr = []
        if (candidate.length > 0) {
            let minLengthDay = Math.min(form.length, candidate[0].days.length)
            let minLengthSubjects = -1
            for (let i = 0; i < form.length; i++) {
                if (i < minLengthDay) {
                    minLengthSubjects = Math.min(form[i].subjects.length, candidate[0].days[i].subjects.length)
                }
                if(form[i].subjects[0].option === null && minLengthSubjects <= 1){
                    continue
                }
                if (form[i].session !== '' && form[i].subjects[0].option !== null) {
                    let subjectArr = []
                    for (let j = 0; j < form[i].subjects.length; j++) {
                        let update = true
                        if (i < minLengthDay && j < minLengthSubjects && candidate[0].days[i].subjects[j].name === form[i].subjects[j].option.value) {
                            update = false
                        }
                        let subjectName = ''
                        if (form[i].subjects[j].option !== null){
                            subjectName = form[i].subjects[j].option.value
                        }
                        subjectArr.push({
                            index: form[i].subjects[j].index ,
                            name: subjectName,
                            time: form[i].subjects[j].time,
                            office: form[i].subjects[j].office,
                            update: update
                        })
                    }

                    daysArr.push({
                        day: form[i].day,
                        session: form[i].session,
                        subjects: subjectArr
                    })
                }
            }
            const classroomObject = new Classroom({
                _id: candidate[0]._id,
                name: classname.value,
                school: user.school,
                days: daysArr
            });

            await Classroom.findByIdAndUpdate({_id: classroomObject._id}, classroomObject);


            res.status(201).json({message: 'Расписание для класса изменено', classroomObject: classroomObject});
        } else {
            for (let i = 0; i < form.length; i++) {
                if (form[i].session !== '' && form[i].subjects[0].option !== '') {
                    daysArr.push({
                        day: form[i].day,
                        session: form[i].session,
                        subjects: Array.from(form[i].subjects, subject => {
                            console.log("subject = ", subject)
                            return {
                                index: subject.index,
                                name: subject.option.value,
                                time: subject.time,
                                office: subject.office,
                                update: false
                            }
                        })
                    })
                }
            }
            const classroomObject = new Classroom({
                name: classname.value,
                school: user.school,
                days: daysArr
            });

            await classroomObject.save();
            res.status(201).json({message: 'Расписание для класса добавлено', daysArr: daysArr});
        }


    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '});
    }
});

// /api/table/get_all_data
router.get('/get_all_data', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);
        const subjects = await DataSubject.find({school: user.school});
        const classrooms = await DataClassroom.find({school: user.school});
        const times = await Time.find({school: user.school});

        let newArrSubjects = []
        for (let i = 0; i < subjects.length; i++) {
            newArrSubjects.push({value: subjects[i].name, label: subjects[i].name, name: 'subject'});
        }
        let sub = {
            subjects: newArrSubjects,
            classrooms: Array.from(classrooms, classroom => {
                return {value: classroom.name, label: classroom.name, name: 'classname'}
            })
        };
        try {
            sub = {
                ...sub,
                times: {
                    firstSession: {
                        options: {value: 'firstSession', label: 'Первая смена', name: 'session'},
                        time: times[0].time.firstSession
                    },
                    secondSession: {
                        options: {value: 'secondSession', label: 'Вторая смена', name: 'session'},
                        time: times[0].time.secondSession
                    },
                    firstSpecialSession: {
                        options: {value: 'firstSpecialSession', label: 'Первая праздничная смена', name: 'session'},
                        time: times[0].special.firstSpecialSession
                    },
                    secondSpecialSession: {
                        options: {value: 'secondSpecialSession', label: 'Вторая праздничная смена', name: 'session'},
                        time: times[0].special.firstSpecialSession
                    }
                },
            };
        } catch (e) {
            console.log(e)
        }


        res.json({
            subjects: sub.subjects,
            classrooms: sub.classrooms,
            times: sub.times
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

module.exports = router;