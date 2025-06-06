const router = require('express').Router();
const User = require('../models/Users');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');


// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (user && (user._id.toString() === req.params.id || user.isAdmin)) {
            try {
                // If a new password is sent and it's not empty, we hash it
                if (req.body.password && req.body.password.trim() !== "") {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } else {
                    // If the password is empty or not sent, we delete it from the request body
                    // To avoid updating the password to an empty value.
                    delete req.body.password;
                }


                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });



                // We separate the password before returnin the user object
                const { password, ...others } = updatedUser._doc;


                // We return the updated user object (without the password)
                return res.status(200).json(others);


            } catch (err) {
                console.error("Error during user update:", err);
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("You can update only your account!");
        }
    } catch (err) {
        console.error("Error during user verification:", err);
        res.status(500).json("An error occurred while verifying permissions");
    }
});

// DELETE

router.delete('/:id', async (req, res) => {

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                try {
                    await Post.deleteMany({ username: user.username });
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("Account has been deleted successfully...");

                } catch (err) {
                    console.error("Error during user elimination:", err);
                    res.status(500).json(err) // 500 is a server error
                }
            } else {
                return res.status(404).json("User not found!")
            }

        } catch (err) {
            res.status(404).json("User not found!")
        }

    } else {
        return res.status(403).json("You can delete only your account!")
    }


});

// GET USER 
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (err) {
        console.error("Error finding user:", err);
        res.status(500).json(err)
    }

});

module.exports = router;