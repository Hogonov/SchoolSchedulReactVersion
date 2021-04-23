const {Router} = require('express');
const {validationResult} = require('express-validator');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
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

            if (text.length > 500) {
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
        const user = await User.findById(req.user.userId);
        let announcements
        if (user.role === 'ROLE_ADMIN') {
            announcements = await Announcement.find({});
        } else {
            announcements = await Announcement.find({school: user.school});
        }
        let arr = Array.from(announcements, announcement => {
            return {
                _id: announcement._id,
                name: announcement.name,
                text: announcement.text,
                school: announcement.school,
                deleteDate: !announcement.deleteDate ? 'T' : announcement.deleteDate
            }
        })
        res.json(arr);
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
        res.json({name: announcement.name, text: announcement.text, deleteDate: date});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

// /api/announcement/edit/:id
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


        if (deleteDate.split('-')[0] > new Date().getFullYear() + 800 && !(deleteDate.length < 1)) {
            return res.status(400).json({message: 'Слишком далекое будущее'})
        }

        await Announcement.findByIdAndUpdate({_id: req.params.id}, {
            _id: req.params.id, name, text,
            school: user.school, deleteDate
        });

        res.status(201).json({message: 'Объявление изменено'})

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

//api/ad/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        await Announcement.findByIdAndRemove(req.params.id);

        res.status(200).json({message: 'Объявление удалено'});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});


module.exports = router;