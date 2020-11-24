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
        const {
            nameTime, session,
            startTime1, endTime1,
            startTime2, endTime2,
            startTime3, endTime3,
            startTime4, endTime4,
            startTime5, endTime5,
            startTime6, endTime6
        } = req.body;

        const user = await User.findById(req.user.userId);

        const schoolYear = new SchoolYear({
            name: nameTime,
            school: user.school,
            session: session,
            quarter: [
                {name: "time1", time: startTime1, end: endTime1},
                {name: "time2", time: startTime2, end: endTime2},
                {name: "time3", time: startTime3, end: endTime3},
                {name: "time4", time: startTime4, end: endTime4},
                {name: "time5", time: startTime5, end: endTime5},
                {name: "time6", time: startTime6, end: endTime6}
            ]
        });

        await schoolYear.save();


        res.status(201).json({message: 'Добавлено'})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '});
    }
});


module.exports = router;