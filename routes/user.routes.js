const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const School = require('../models/School');
const User = require('../models/User');
const router = Router();


// /api/users/add_user
router.post(
    '/add_user', auth,
    [
        check('login', 'Некорректный login').exists(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
        check('role', 'Введите роль').exists()
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

            const newSchool = new School({name: school.value});

            if (candidate) {
                return res.status(201).json({message: 'Такой пользователь уже существует', ok: true})
            }

            let candidateSchool = await School.findOne({name: school.value})
            if (!candidateSchool)
                await newSchool.save();


            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({login, password: hashedPassword, school: school.value, role});

            await user.save();

            res.status(201).json({message: 'Пользователь создан', ok: true})

        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    });


// /api/users/get_all
router.get('/get_all', auth, async (req, res) => {
    try {
        const users = await User.find({}).sort({role: 1});
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

        const {login, password, school, role} = req.body;

        const candidateSchool = await School.findOne({name: school.value})
        const newSchool = new School({_id: candidateSchool.id, name: school.value})
        await School.findByIdAndUpdate({_id: newSchool.id}, newSchool);

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({_id: req.params.id, login, password: hashedPassword, school: school.value, role});

        await User.findByIdAndUpdate({_id: req.params.id}, user);

        res.status(201).json({message: 'Пользователь изменён'});

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/users/delete_user/:id
router.delete('/delete_user/:id', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);
        if (user.role === 'ROLE_ADMIN') {
            User.findByIdAndRemove({_id: req.params.id}, (err, data) => {
                if(!!err){
                    console.log(err)
                }
            })
            res.status(201).json({message: 'Пользователь удален', ok: true});
        } else {
            res.status(403).json({message: 'Недостаточно прав для данной операции'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;