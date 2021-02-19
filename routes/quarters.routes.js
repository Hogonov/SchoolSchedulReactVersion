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

// /api/quarter/add
router.post('/add', auth, async (req, res) => {
    try {
        const {
            nameYear,
            startQuarter1, endQuarter1,
            startQuarter2, endQuarter2,
            startQuarter3, endQuarter3,
            startQuarter4, endQuarter4
        } = req.body;

        const user = await User.findById(req.user.userId);

        const schoolYear = new SchoolYear({
            name: nameYear,
            school: user.school,
            interval: {start: startQuarter1, end: endQuarter4},
            quarter: [
                {name: "Quarter1", start: new Date(startQuarter1), end: new Date(endQuarter1)},
                {name: "Quarter2", start: new Date(startQuarter2), end: new Date(endQuarter2)},
                {name: "Quarter3", start: new Date(startQuarter3), end: new Date(endQuarter3)},
                {name: "Quarter4", start: new Date(startQuarter4), end: new Date(endQuarter4)}
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