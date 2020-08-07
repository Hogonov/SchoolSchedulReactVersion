const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const Subject = require('../models/DataSubject');
const Table = require('../models/Table');
const Classroom = require('../models/DataClassroom');
const School = require('../models/School');
const User = require('../models/User');
const router = Router();


// /api/users/add_user
router.post(
    '/add_user', auth,
    [
        check('login', 'Некорректный login').exists(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
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

            const {login, password, school, role} = req.body;

            const candidate = await User.findOne({login});

            const newSchool = new School({name: school});

            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({login, password: hashedPassword, school, role});

            if (!await School.findOne({name: school}))
                await newSchool.save();
            await user.save();

            res.status(201).json({message: 'Пользователь создан'})

        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    });


// /api/users/get_all
router.get('/get_all', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/users/get_user
router.get('/get_user/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/users/edit_user/:id
router.put('/edit_user/:id', auth, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректный данные при регистрации'
            });
        }

        const {login, password, school, role} = req.body;


        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({_id: req.params.id, login, password: hashedPassword, school, role});

        await User.findByIdAndUpdate({_id: req.params.id}, user);

        res.status(201).json({message: 'Пользователь изменён'});

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;