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
const Ad = require('../models/Ad');
const SpecialDate = require('../models/SpecialDate');
const crypto = require('crypto');
const fs = require('fs');
const multer  = require('multer');
const upload = multer({ dest: 'public/images/Ad' });
const router = Router();

//api/ad/add
router.post('/add', auth,
    [
        check('name', 'Некорректный login').exists()
    ],
    async (req,res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                });
            }
            const {name} = req.body;
            const user = await User.findById(req.user.userId);
            const ad = new Ad({name: name, school: user.school});
            const savedAd = await ad.save();

            res.status(200).json({message: 'OK', id: savedAd.id})

        } catch (e) {
            // console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });

//api/ad/add_file
router.put('/add_file/:id', upload.single('image'), auth, async (req, res) => {
    try {
        const image = {...req.file, path: req.file.path + '.png'};
        console.log(image);
        fs.rename(req.file.path, image.path, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
        const id = req.params.id;

        const ad = await Ad.findById(id);
        const newAd = new Ad({
            _id: ad.id,
            name: ad.name,
            text: ad.text,
            school: ad.school,
            image: image.path
        });

        await Ad.findByIdAndUpdate({_id: ad.id}, newAd);

        res.status(200).json({message: 'Реклама добавлена'})

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

//api/ad/get/:id
router.get('/get/:id', async (req, res) => {
    try {

        const ad = await Ad.findById(req.params.id);
        res.setHeader("Content-Type", "image/png");
        console.log("work");
        fs.readFile(ad.image, function(error, image){
            if(error) throw error;
            res.end(image);
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


//api/ad/get_data/:id
router.get('/get_data/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        const ad = await Ad.find({school: school.name});

        res.json({ad: ad})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});




module.exports = router;