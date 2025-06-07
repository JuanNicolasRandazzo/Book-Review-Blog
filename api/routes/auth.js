const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');


// REGISTER
router.post('/register', async (req, res) => {
    try {

        // Check if the user with the same username already exists
        const existingUserByUsername = await User.findOne({ username: req.body.username });
        if (existingUserByUsername) {
            return res.status(409).json("This username is already taken.");
        }

        // Check if the user with the same email already exists
        const existingUserByEmail = await User.findOne({ email: req.body.email });
        if (existingUserByEmail) {
            return res.status(409).json("This email is already taken.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        });

        // Save the new user
        const savedUser = await newUser.save();

        const verificationToken = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_VERIFY_SECRET,
            { expiresIn: '5m' }
        );

        // Prepare and send the verification email
        const verificationLink = `http://localhost:8000/api/auth/verify-email/${verificationToken}`;
        const emailSubject = "Verification Email Ascending Blog";
        const emailHtml = `
             <h1>Welcome to Ascending Blog!</h1>
             <p>Thanks for registrate. Please, click on the following link to activate your account:</p>
             <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Link</a>
             <p>This link is valid for 5 minutes.</p>
             <p>If you did not register, please ignore this email</p>
             `
        await sendEmail(savedUser.email, emailSubject, emailHtml);

        // Respond to the frontend with a success message, not with the user data
        res.status(201).json({ message: "User registered successfully. Please, check your email to verify your account." })

        // const user = await newUser.save();
        // res.status(201).json(user);
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json(err) // 500 is a server error
    }

});

// VERIFY EMAIL
router.get('/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (user.isVerified) {
            return res.status(400).send("User is already verified");
        }

        user.isVerified = true;
        await user.save();

        // Redirect the frontend to a success page
        return res.redirect(`${process.env.FRONTEND_URL}/verification-success`)
    } catch (err) {
        // If invalid token or expires
        console.error("Error during email verification:", err.message);
        return res.redirect(`${process.env.FRONTEND_URL}/verification-failure`);
    }
})

// LOG IN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(404).json("Wrong Credentials!")
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json("Please verify your email before logging in.");
        }

        const validated = await bcrypt.compare(req.body.password, user.password)

        if (!validated) {
            return res.status(400).json("Wrong Credentials!");
        }

        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json(err) // 500 is a server error
    }
})



module.exports = router;