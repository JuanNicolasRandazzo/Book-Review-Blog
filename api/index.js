const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const genreRoute = require('./routes/genres');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const authorRoute = require('./routes/authors');





const port = process.env.PORT ?? 8000

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(console.log('YEEEEES We are conncected to MONGOO')).catch(err => console.log(err))


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/genres", genreRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/authors", authorRoute);

app.listen(port, () => {
    console.log('backend is running on port', port)
})