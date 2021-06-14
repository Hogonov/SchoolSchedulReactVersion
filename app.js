const express = require('express');
const config = require('./config/default.json');
const configProd = require('./config/production.json');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();


app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use(express.json({extended: true}));

//авторизация
app.use('/api/auth', require('./routes/auth.routes'));
//вьюха и редактор
app.use('/api/table', require('./routes/table.routes'));
//данные о пользователях
app.use('/api/users', require('./routes/user.routes'));
//данные о школах
app.use('/api/school', require('./routes/school.routes'));
//данные об объявлениях
app.use('/api/announcement', require('./routes/announcement.routes'));
app.use('/api/view', require('./routes/view.routes'));
//директор
app.use('/api/dir', require('./routes/dir.routes'));
//реклама
app.use('/api/ad', require('./routes/ad.routes'));
//года и четверти
app.use('/api/quarter', require('./routes/quarters.routes'));
//Расписание звонков
app.use('/api/time', require('./routes/time.routes'))
//Спецкурсы
app.use('/api/special_course', require('./routes/special_course.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.NODE_ENV === 'production' ? configProd.port : config.port;


async function start() {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start();

