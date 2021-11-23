require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

const authRouter = require('./routers/authRouter');
const postRouter = require('./routers/postsRouter');
const discoveryRouter = require('./routers/discoveryRouter');
const radioRouter = require('./routers/radioRouter');
const rankRouter = require('./routers/rankRouter');
const radioViewRouter = require('./routers/radioViewRouter');
const categoryRouter = require('./routers/categoryRouter');
const songRouter = require('./routers/songRouter');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mp3-backend.iflql.mongodb.net/mp3-backend?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();
app.use(express.json({ limit: '50m' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cors());
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
    })
);

app.use('/api', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/discovery', discoveryRouter);
app.use('/api/radio', radioRouter);
app.use('/api/rank', rankRouter);
app.use('/api/radioview', radioViewRouter);
app.use('/api/category', categoryRouter);
app.use('/api/song', songRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
