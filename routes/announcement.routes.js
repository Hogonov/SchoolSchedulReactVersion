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
const Announcement = require('../models/Announcement');
const router = Router();

// /api/announcement/add
router.post('/add', auth,
    async (req, res) => {
        try {
            const errors = validationResult(req);


            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при добавлении в объявления'
                });
            }

            const user = await User.findById(req.user.userId);

            const {text, deleteDate, name} = req.body;

            if(text.length > 500){
                return res.status(400).json({message: 'Введенно больше 500 символов'});
            }

            const announcement = new Announcement({
                name: name, text: text,
                school: user.school, deleteDate: deleteDate
            });

            await announcement.save();

            res.status(201).json({message: 'Объявление добавленно'});

        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });


// /api/announcement/get_all
router.get('/get_all', auth, async (req, res) => {
    try {
        const announcements = await Announcement.find({});
        res.json(announcements);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/announcement/get_data/:id
router.get('/get_data/:id', auth, async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        const deleteDate = announcement.deleteDate;
        const date = deleteDate.toJSON().split('T')[0];
        console.log(date);
        res.json({name: announcement.name, text: announcement.text, deleteDate: date});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/users/edit_user/:id
router.put('/edit/:id', auth, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректный данные при редактировании'
            });
        }

        const user = await User.findById(req.user.userId);

        const {text, deleteDate, name} = req.body;


        if (deleteDate.split('-')[0] > new Date().getFullYear() + 800) {
            console.log(deleteDate.split('-')[0].length + " " + new Date().getFullYear().length);
            res.status(400).json({message: 'Слишком далекое будущее'})
        }


        const announcement = new Announcement({
                _id: req.params.id, name: name, text: text,
                school: user.school, deleteDate: deleteDate
            }
        );

        console.log(req.body);

        await Announcement.findByIdAndUpdate({_id: req.params.id}, announcement);

        res.status(201).json({message: 'Объявление изменено'})

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;