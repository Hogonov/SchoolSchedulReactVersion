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

        const user = await User.findById(req.user.userId);
        const candidate = await SpecialCourse.findOne({school: user.school}); // добавить привязку к четвертям школы
        const specialCourse = new SpecialCourse({
            school: user.school,
            courses: courses
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


module.exports = router;