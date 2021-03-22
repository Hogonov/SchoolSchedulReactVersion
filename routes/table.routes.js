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


// /api/table/subject
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
            const user = await User.findById(req.user.userId);
            const candidate = await DataSubject.findOne({name: subjectName, school: user.school});

            if (candidate) {
                return res.status(400).json({message: 'Такой предмет уже добавлен'})
            }
            const subject = new DataSubject({name: subjectName, school: user.school});
            await subject.save();

            res.status(201).json({message: 'Предмет добавлен'})


        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });


// /api/table/classroom
router.post('/classroom',
    auth,
    async (req, res) => {
        try {

            const {classLetters, lastLetter, lengthLetters, checkedClass, checkedArr} = req.body;

            const user = await User.findById(req.user.userId);
            const candidate = await DataClassroom.find({school: user.school})

            if (candidate.length > 0) {
                const classroom = new DataClassroom({
                    _id: candidate[0]._id,
                    classes: checkedClass.sort(),
                    checkedArr: checkedArr,
                    school: user.school
                });
                await DataClassroom.findByIdAndUpdate({_id: classroom._id}, classroom);
                res.status(201).json({message: 'Классы изменены'})
            } else {
                const classroom = new DataClassroom({
                    classes: checkedClass.sort(),
                    checkedArr: checkedArr,
                    school: user.school
                });
                await classroom.save();
                res.status(201).json({message: 'Классы добавлен'})
            }


        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });

// /api/table/get_checked_classroom
router.get('/get_checked_classroom', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const classrooms = await DataClassroom.find({school: user.school});
        if (classrooms.length > 0) {
            let lastLetter = 'A'
            classrooms[0].classes.forEach(e => {
                let letter = e.charAt(e.length - 1)
                if (letter > lastLetter){
                    lastLetter = letter
                }
            })
            res.json({classrooms: classrooms[0], candidate: true, lastLetter: lastLetter})
        } else {
            res.json({candidate: false});
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


// /api/table/get_subject
router.get('/get_subject', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const subjects = await DataSubject.find({school: user.school});
        res.json(subjects);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/table/delete_subject/:id
router.delete('/delete_subject/:id', auth, async (req, res) => {
    try {

        DataSubject.findByIdAndRemove({_id: req.params.id}, (err, data) => {
            if (!!err) {
                console.log(err)
            }
        })
        res.status(201).json({message: 'Предмет удален', ok: true});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});
// /api/table/get_classes
router.get('/get_classes', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const classrooms = await DataClassroom.find({school: user.school}).sort({name: 1});
        res.json(classrooms);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/table/get_view_classes/:id
router.get('/get_view_classes/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        const classrooms = await Classroom.find({school: school.name}).sort({name: 1});
        let classes = Array.from(classrooms, classroom => {
            return {label: classroom.name, value: classroom.name}
        })
        console.log(classes)
        res.json(classes);
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
        console.log(candidate)
        const time = await Time.find({school: user.school});
        const timeObj = {
            firstSession: time[0].time.firstSession,
            secondSession: time[0].time.secondSession,
        }
        const index = {
            firstSession: 0,
            secondSession: 1,
        }
        if (candidate.length > 0) {
            let daysArr = []
            for (let i = 0; i < candidate[0].days.length; i++) {
                daysArr.push({
                    classname: {
                        value: candidate[0].name,
                        label: candidate[0].name,
                        name: "classname"
                    }, session: {
                        ...candidate[0].days[i].session,
                        index: index[candidate[0].days[i].session.value],
                        time: timeObj[candidate[0].days[i].session.value]
                    },
                    day: candidate[0].days[i].day,
                    subjects: Array.from(candidate[0].days[i].subjects, subject => {
                        return {
                            index: subject.index,
                            name: `subject-${subject.index}`,
                            office: subject.office,
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
            res.json({candidateData: prepareData, candidate: true,
                maxLength: Math.max(timeObj.firstSession.length, timeObj.secondSession.length)});
        } else {
            res.json({candidate: false});
        }
    } catch (e) {
        console.log(e);
    }
});

// /api/table/get_data_class/:classname/:school
router.get('/get_data_class/:classname/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        const candidate = await Classroom.find({name: req.params.classname, school: school.name});
        console.log(candidate)
        const time = await Time.find({school: school.name});
        const timeObj = {
            firstSession: time[0].time.firstSession,
            secondSession: time[0].time.secondSession,
        }
        const index = {
            firstSession: 0,
            secondSession: 1,
        }
        if (candidate.length > 0) {
            let daysArr = []
            for (let i = 0; i < candidate[0].days.length; i++) {
                daysArr.push({
                    classname: {
                        value: candidate[0].name,
                        label: candidate[0].name,
                        name: "classname"
                    }, session: {
                        ...candidate[0].days[i].session,
                        index: index[candidate[0].days[i].session.value],
                        time: timeObj[candidate[0].days[i].session.value]
                    },
                    day: candidate[0].days[i].day,
                    subjects: Array.from(candidate[0].days[i].subjects, subject => {
                        return {
                            index: subject.index,
                            name: `subject-${subject.index}`,
                            office: subject.office,
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
            res.json({candidateData: prepareData, candidate: true,
                maxLength: Math.max(timeObj.firstSession.length, timeObj.secondSession.length)});
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
                if (form[i].subjects[0].option === null && minLengthSubjects <= 1) {
                    continue
                }
                if (form[i].session !== '' && form[i].subjects[0].option !== null) {
                    let subjectArr = []
                    for (let j = 0; j < form[i].subjects.length; j++) {
                        let update = true
                        if (i < minLengthDay &&
                            j < minLengthSubjects &&
                            candidate[0].days[i].subjects[j].name === form[i].subjects[j].option.value
                        ) {
                            update = false
                        }
                        let subjectName = ''
                        if (form[i].subjects[j].option !== null) {
                            subjectName = form[i].subjects[j].option.value
                        }
                        subjectArr.push({
                            index: form[i].subjects[j].index,
                            name: subjectName,
                            office: form[i].subjects[j].office,
                            update: update,
                            date: new Date()
                        })
                    }
                    daysArr.push({
                        day: form[i].day,
                        session: form[i].session,
                        subjects: subjectArr
                    })
                } else {
                    daysArr.push({
                        day: form[i].day,
                        session: {value: 'firstSession', label: 'Первая смена', name: 'session'},
                        subjects: [{index: 1, name: '', option: null, office: '', time: '', update: false, date: new Date()}]
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
                        session: {
                            value: form[i].session.value,
                            label: form[i].session.label,
                            name: form[i].session.label
                        },
                        subjects: Array.from(form[i].subjects, subject => {
                            return {
                                index: subject.index,
                                name: subject.option.value,
                                office: subject.office,
                                update: false,
                                date: new Date()
                            }
                        })
                    })
                } else {
                    daysArr.push({
                        day: form[i].day,
                        session: {value: 'firstSession', label: 'Первая смена', name: 'session'},
                        subjects: [{index: 1, name: '', option: null, office: '', time: '', update: false, date: new Date()}]
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
        const classrooms = (await DataClassroom.find({school: user.school}))[0].classes;
        const times = await Time.find({school: user.school});
        let newArrSubjects = []
        for (let i = 0; i < subjects.length; i++) {
            newArrSubjects.push({value: subjects[i].name, label: subjects[i].name, name: 'subject'});
        }
        let sub = {
            subjects: newArrSubjects,
            classrooms: Array.from(classrooms, classroom => {
                return {value: classroom, label: classroom, name: 'classname'}
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