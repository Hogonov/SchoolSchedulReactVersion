const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const School = require('../models/School');
const User = require('../models/User');
const Ad = require('../models/Ad');
const fs = require('fs');
const multer  = require('multer');
const upload = multer({ dest: 'public/images/Ad' });
const router = Router();

//api/ad/add
router.post('/add', auth,
    async (req,res) => {
        try {
            const user = await User.findById(req.user.userId);
            if (user.role !== "ROLE_ADMIN"){
                return res.status(401).json({message: 'Недостаточно прав'})
            }
            const {name, school} = req.body;
            const ad = new Ad({name: name, school: school.label});
            const savedAd = await ad.save();

            res.status(200).json({message: 'OK', id: savedAd.id})
        } catch (e) {
             console.log(e);
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
        }
    });

// /api/ad/edit/:id
router.put('/edit/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user.role !== "ROLE_ADMIN"){
            return res.status(401).json({message: 'Недостаточно прав'})
        }
        const {name, school} = req.body;
        await Ad.findByIdAndUpdate({_id:req.params.id},{
            _id:req.params.id, name, school: school.label
        })
        res.status(200).json({message: 'OK', id: savedAd.id})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

//api/ad/add_file
router.put('/add_file/:id', upload.single('image'), auth, async (req, res) => {
    try {
        const image = {...req.file, path: req.file.path + '.png'};
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
router.get('/get_data_ad/:id', async (req, res) => {
    try {
        const school = await School.findById(req.params.id);
        const ad = await Ad.find({school: school.name});
        res.json({ad: ad, isDataReady: true})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

//api/ad/get_all
router.get('/get_all', async (req, res) => {
    try {
        const ad = await Ad.find({});
        res.json({ad, isReady: true})
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
    }
});

//api/ad/delete/:id
router.delete('/delete/:id', async (req, res) => {
   try {
       const ad = await Ad.findById(req.params.id);
       fs.unlink(ad.image, async (e) => {
           try {
               await Ad.findByIdAndRemove(req.params.id);
           } catch (e) {
               console.log(e)
               await Ad.findByIdAndRemove(req.params.id);
           }
       });
       res.status(200).json({message: 'Реклама удалена'});
   } catch (e) {
       console.log(e);
       res.status(500).json({message: 'Что-то пошло не так, попробуйте снова '})
   }
});



module.exports = router;