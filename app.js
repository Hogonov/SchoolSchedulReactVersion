const express = require('express');
const config = require('config');
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
//данные об объявлениях
app.use('/api/announcement', require('./routes/announcement.routes'));
app.use('/api/view', require('./routes/view.routes'));
//директор
app.use('/api/dir', require('./routes/dir.routes'));
//реклама
app.use('/api/ad', require('./routes/ad.routes'));
//года и четверти
app.use('/api/year', require('./routes/year.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
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

