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
const multer = require('multer');
const path = require('path');





const port = process.env.PORT ?? 8000

dotenv.config();
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL).then(console.log('YEEEEES We are conncected to MONGOO')).catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/genres", genreRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/authors", authorRoute);

app.listen(port, () => {
    console.log('backend is running on port', port)
})