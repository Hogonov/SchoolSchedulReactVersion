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
const SpecialCourse = require('../models/SpecialCourse');
const router = Router();

//api/special_course/add
router.post('/add', auth, async (req, res) => {
    try {

        const {courses} = req.body;

        let handlingCourses = Array.from(courses, courses =>{
            let course = []
            for (let i = 0; i < courses.course.length; i++) {
               if(courses.course[i].name !== '' && courses.course[i].time !== '' ){
                   course.push({...courses.course[i], index: i + 1})
               }
            }
            return {...courses, course: course}
        })

        const user = await User.findById(req.user.userId);
        const candidate = await SpecialCourse.findOne({school: user.school}); // добавить привязку к четвертям школы
        const specialCourse = new SpecialCourse({
            school: user.school,
            courses: handlingCourses
        });

        if (candidate) {
            await SpecialCourse.findByIdAndUpdate({_id: candidate.id},
                {
                    _id: candidate.id,
                    school: specialCourse.school,
                    courses: specialCourse.courses
                }
            );
        } else {
            await specialCourse.save();
        }

        res.status(201).json({message: 'Добавлено'})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '});
    }
});

//api/special_course/get/:id
router.get('/get/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        const specialCourse = await SpecialCourse.find({school: school.name});
        let nowIndexDay = new Date().getDay() - 1
        res.json({
            day: specialCourse[0].courses[nowIndexDay].day,
            specialCourse: specialCourse[0].courses[nowIndexDay].course,
            isDataReady: true
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

module.exports = router;