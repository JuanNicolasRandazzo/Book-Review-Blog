const router = require('express').Router();
const Author = require('../models/Author');
const User = require('../models/Users');

// CREATE AUTHOR
router.post('/', async (req, res) => {

    try {
        const user = await User.findById(req.body.userId);

        if (user) {
            try {
                const newAuthor = new Author(req.body);
                const savedAuthor = await newAuthor.save();
                res.status(201).json(savedAuthor);
            } catch (err) {
                console.error("You can't create a new Author. You are not a user. Please sign up first:", err);
                return res.status(500).json("An error ocurred while creating the author.");
            }
        } else {
            return res.status(403).json("You can't create a new Author. You are not a user. Please sign up first.");
        }
    } catch (err) {
        console.error("Error during author creation:", err);
        return res.status(500).json("An error ocurred while verifying permissions");
    }
});

// GET ALL AUTHORS
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        console.error("Error fetching authors:", err);
        res.status(500).json(err);
    }
});

// GET AUTHOR
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json(author);
    } catch (err) {
        console.error("Error fetching author:", err);
        res.status(500).json(err);
    }
});

// UPDATE AUTHOR
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        const author = await Author.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found!");
        }
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        if (user) {
            try {
                const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });

                return res.status(200).json(updatedAuthor);
            } catch (err) {
                console.error("Error during author update:", err);
                return res.status(500).json("An error ocurred while updating the author.");
            }
        } else {
            return res.status(403).json("You can't update Author info. Please sign up.");
        }
    } catch (err) {
        console.error("Error during author update:", err);
        res.status(500).json("An error ocurred while verifying permissions");
    }
});

// DELETE AUTHOR
router.delete('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.body.userId);
        const author = await Author.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found!");
        }
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        if (user.isAdmin) {
            try {
                const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
                if (!deletedAuthor) {
                    return res.status(404).json("Author not found");
                }
                return res.status(200).json("Author deleted successfully");
            } catch (err) {
                console.error("You can't delete an author:", err);
                return res.status(500).json("An error ocurred while deleting the author.");
            }
        } else {
            return res.status(403).json("You can't delete an author. You don't have the permissions.");
        }
    } catch (err) {
        console.error("Error during author deleting:", err);
        return res.status(500).json("An error ocurred while verifying permissions");
    }
});


module.exports = router;
