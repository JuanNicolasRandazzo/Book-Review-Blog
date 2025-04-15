const router = require('express').Router();
const Genre = require('../models/Genre');
const User = require('../models/Users');

// CREATE GENRE
router.post('/', async (req, res) => {

    try {
        const user = await User.findById(req.body.userId);

        if (user.isAdmin) {
            try {
                const newGenre = new Genre(req.body);
                const savedGenre = await newGenre.save();
                res.status(201).json(savedGenre);
            } catch (err) {
                console.error("You can't create a genre. You are not an admin:", err);
                return res.status(500).json("An error ocurred while creating the genre.")
            }
        } else {
            return res.status(403).json("You can't create a genre.");
        }

    } catch (err) {
        console.error("Error during genre creation:", err);
        return res.status(500).json("An error ocurred while verifying permissions")
    }
});

// GET ALL GENRES
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (err) {
        console.error("Error fetching genres:", err);
        res.status(500).json(err);
    }
});

// GET GENRE

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            res.status(404).json({ message: "Genre not found" });
        }
        res.status(200).json(genre);

    } catch (err) {
        console.error("Error fetching genre:", err);
        res.status(500).json(err);
    }
})

// UPDATE GENRE
/* Right now it is not necessary. If I ever need it I'll implement it. */


// DELETE GENRE

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user.isAdmin) {
            try {
                const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
                if (!deletedGenre) {
                    return res.status(404).json("Genre not found");
                }
                res.status(200).json("Genre deleted successfully");

            } catch (err) {
                console.error("You can't delete a genre:", err);
                return res.status(500).json("An error ocurred while deleting the genre.")
            }
        } else {
            return res.status(403).json("You can't delete a genre.");
        }

    } catch (err) {
        console.error("Error during genre deleting:", err);
        return res.status(500).json("An error ocurred while verifying permissions")
    }
})
module.exports = router;

