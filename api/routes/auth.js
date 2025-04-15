const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');


// REGISTER
router.post('/register', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        })

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json(err) // 500 is a server error
    }

});

// LOG IN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(400).json("Wrong Credentials!")

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("Wrong Credentials!")

        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json(err) // 500 is a server error
    }
})



module.exports = router;