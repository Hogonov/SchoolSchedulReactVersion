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

// /api/year/add
router.post('/add', auth, async (req, res) => {
    try {
        const {
            nameYear, startYear, finishYear,
            nameQuarter1, startQuarter1, finishQuarter1,
            nameQuarter2, startQuarter2, finishQuarter2,
            nameQuarter3, startQuarter3, finishQuarter3,
            nameQuarter4, startQuarter4, finishQuarter4
        } = req.body;

        const user = await User.findById(req.user.userId);

        const schoolYear = new SchoolYear({
            name: nameYear,
            school: user.school,
            interval: {start: startYear, finish: finishYear},
            quarter: [
                {name: nameQuarter1, start: startQuarter1, finish: finishQuarter1},
                {name: nameQuarter2, start: startQuarter2, finish: finishQuarter2},
                {name: nameQuarter3, start: startQuarter3, finish: finishQuarter3},
                {name: nameQuarter4, start: startQuarter4, finish: finishQuarter4}
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