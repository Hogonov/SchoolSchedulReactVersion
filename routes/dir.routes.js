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
const SpecialDate = require('../models/SpecialDate');
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'public/images/Dir'});
const router = Router();

//api/dir/add
router.post('/add', auth,
    [
        check('name', 'Некорректный login').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                });
            }
            let id;
            const {name, phone, email} = req.body;
            const user = await User.findById(req.user.userId);
            const candidateArr = await Director.find({school: user.school});
            candidateArr.forEach(candidate => {
                fs.unlink(candidate.image, async (e) => {
                    if (e) throw e;
                    await Director.findByIdAndRemove(candidate.id);
                });

            });

            const dir = new Director({name, phone, email, school: user.school});
            const savedDir = await dir.save();

            res.status(200).json({message: 'OK', id: savedDir.id})

        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });

//api/dir/add_file
router.put('/add_file/:id', upload.single('image'), auth, async (req, res) => {
    try {
        const image = {...req.file, path: req.file.path + '.png'};
        fs.rename(req.file.path, image.path, function (err) {
            if (err) console.log('ERROR: ' + err);
        });
        const id = req.params.id;

        const dir = await Director.findById(id);
        const newDir = new Director({
            _id: dir.id,
            name: dir.name,
            text: dir.text,
            school: dir.school,
            image: image.path
        });

        await Director.findByIdAndUpdate({_id: dir.id}, newDir);

        res.status(200).json({message: 'Директор добавлен'})

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

//api/dir/get/:id
router.get('/get/:id', async (req, res) => {
    try {

        const dir = await Director.findById(req.params.id);
        res.setHeader("Content-Type", "image/png");
        fs.readFile(dir.image, function (error, image) {
            try {
                res.end(image);
            } catch (e) {
                console.log(e);
            }
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});
// /api/dir/get_data_form
router.get('/get_data_form', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const dir = await Director.find({school: user.school});
        if (dir.length > 0){
            console.log(dir[0])
            res.json({
                name: dir[0].name,
                phone: dir[0].phone,
                email: dir[0].email,
                candidate: true
            })
        } else {
            res.json({candidate: false})
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

//api/dir/get_data/:id
router.get('/get_data/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        const dir = await Director.find({school: school.name});
        res.json({
            name: dir[0].name,
            phone: dir[0].phone,
            email: dir[0].email,
            urlImage: `/api/dir/get/${dir[0].id}`,
            isDataReady: true
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;