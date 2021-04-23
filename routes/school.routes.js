const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const School = require('../models/School');
const User = require('../models/User');
const router = Router();


// /api/school/add
router.post(
    '/add', auth,
    [
        check('school', 'Некорректное название школы').exists()
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

            const {school} = req.body;

            const newSchool = new School({name: school});


            let candidateSchool = await School.findOne({name: school})
            if (!candidateSchool)
                await newSchool.save();

            res.status(201).json({message: 'Школа добавлена', ok: true})

        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    });


// /api/school/edit/:id
router.put(
    '/edit/:id', auth,
    [
        check('school', 'Некорректное название школы').exists()
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

            const {school} = req.body;


            await School.findByIdAndUpdate(req.params.id,{name: school})



            res.status(201).json({message: 'Название школы измененно', ok: true})

        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    });



// /api/school/get_all
router.get('/get_all', auth, async (req, res) => {
    try {
        const schools = await School.find({}).sort({name: 1});
        const arr = Array.from(schools, school => {
            return {value: school.name, label: school.name}
        })
        res.json(arr);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});
// /api/school/delete/:id
router.delete('/delete_user/:id', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.userId);
        if (user.role === 'ROLE_ADMIN') {
            School.findByIdAndRemove({_id: req.params.id}, (err, data) => {
                if(!!err){
                    console.log(err)
                }
            })
            res.status(201).json({message: 'Школа удалена', ok: true});
        } else {
            res.status(403).json({message: 'Недостаточно прав для данной операции'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;