const router = require('express').Router();
const Category = require('../models/Category');
const User = require('../models/Users');

// CREATE CATEGORY
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);

        if (user.isAdmin) {
            try {
                const newCategory = new Category(req.body);
                const savedCategory = await newCategory.save();
                res.status(201).json(savedCategory);

            } catch (err) {
                console.error("You can't create a category.", err);
                return res.status(500).json("An error ocurred while creating the category.")
            }
        } else {
            return res.status(403).json("You can't create a category.");
        }

    } catch (err) {
        console.error("Error during category creation:", err);
        return res.status(500).json("An error ocurred while verifying permissions");
    }
});

// GET ALL CATEGORIES
router.get('/', async (req, res) => {
    try {
        const genres = await Category.find();
        res.status(200).json(genres);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json(err);
    }
});

// GET CATEGORY
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ message: "Category not found" })
        }
        res.status(200).json(category);
    } catch (err) {
        console.error("Error fetching category:", err);
        res.status(500).json(err);
    }
});

// DELETE CATEGORY
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (user.isAdmin) {
            try {
                const deletedCategory = await Category.findByIdAndDelete(req.params.id);
                if (!deletedCategory) {
                    return res.status(404).json("Category not found.");
                }
                return res.status(200).json("Category deleted successfully.");
            } catch (err) {
                console.error("You can't delete a category:", err);
                return res.status(500).json("An error ocurred while deleting the category.");
            }
        } else {
            return res.status(403).json("You can't delete a category.")
        }
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json(err);
    }
})

module.exports = router;
