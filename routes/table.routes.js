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
         }*/


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
            school: user.school
        });
        console.log(time)
        await time.save();

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
    [check('schoolName', 'Введите название школы').isLength({min: 1})],
    auth,
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
    });

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


// /api/table/editor
router.post('/editor', auth,
    [
        check('classroom', 'Выберети класс').isLength({min: 1}),
        check('session', 'Выберети смену').isLength({min: 1}),
        check('session', 'Выберети день').isLength({min: 1}),
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при добавлении в расписание'
                });
            }


            const user = await User.findById(req.user.userId);

            const {
                classroom, session, day,
                subject1, office1,
                subject2, office2,
                subject3, office3,
                subject4, office4,
                subject5, office5,
                subject6, office6
            } = req.body;

            const candidate = await Classroom.find({name: classroom, session: session, school: user.school, day: day});


            const time = await Time.find({session: session, school: user.school});

            let subTime = time[0].time;


            const subjects = [
                {name: subject1, time: subTime[0], office: office1, update: false},
                {name: subject2, time: subTime[1], office: office2, update: false},
                {name: subject3, time: subTime[2], office: office3, update: false},
                {name: subject4, time: subTime[3], office: office4, update: false},
                {name: subject5, time: subTime[4], office: office5, update: false},
                {name: subject6, time: subTime[5], office: office6, update: false}
            ];


            const classroomObject = new Classroom(
                {
                    name: classroom,
                    session: session,
                    subjects: subjects,
                    school: user.school,
                    day: day,
                    date: new Date()
                });

            if (candidate.length > 0) {
                for (let i = 0; i < candidate[0].subjects.length; i++) {
                    if (candidate[0].subjects[i].name.toLowerCase() !== subjects[i].name.toLowerCase()) {
                        subjects[i] = {...subjects[i], update: true}
                    }
                }
                await Classroom.findByIdAndUpdate({_id: candidate[0]._id},
                    {
                        _id: candidate[0]._id,
                        name: classroom,
                        session: session,
                        subjects: subjects,
                        school: user.school,
                        day: day,
                        date: new Date()
                    }
                );
            } else {
                await classroomObject.save();
            }

            res.status(201).json({message: 'Расписание для класса добавлено'});

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
        const firstTimes = await Time.find({school: user.school, session: 'first'});
        const secondTimes = await Time.find({school: user.school, session: 'second'});


        const sub = {
            subjects: Array.from(subjects, subject => {
                return {value: subject.name, label: subject.name}
            }),
            classrooms: Array.from(classrooms, classroom => {
                return {value: classroom.name, label: classroom.name}
            })
        };


        res.json({
            subjects: sub.subjects,
            classrooms: sub.classrooms,
            firstTimes: firstTimes,
            secondTimes: secondTimes,

        });

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

module.exports = router;