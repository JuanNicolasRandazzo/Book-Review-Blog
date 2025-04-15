const router = require('express').Router();
const User = require('../models/Users');
const Post = require('../models/Post');



// CREATE POST
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json("User not found!")
        }
        const newPost = new Post({
            ...req.body,
            username: user.username
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    } catch (err) {
        console.error("Error during post creation:", err);
        res.status(500).json(err)
    }

});

// UPATE POST

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json("User nor found!");
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post nor found!");
        }

        if (post.userId.toString() === user._id.toString() || user.isAdmin) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });

                return res.status(200).json("Account has been updated successfully!");

            } catch (err) {
                console.error("Error during post update:", err);
                return res.status(500).json("An error occurred while updating the post.");
            }
        } else {
            return res.status(403).json("You can only update yout own post.");
        }
    } catch (err) {
        console.error("Error during post update:", err);
        res.status(500).json("An error ocurred while verifying permissions");
    }
})

// DELETE POST
router.delete('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json("User nor found!");
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post nor found!");
        }

        if (post.userId.toString() === user._id.toString() || user.isAdmin) {
            try {
                const deletedPost = await Post.findByIdAndDelete(req.params.id);
                if (!deletedPost) {
                    return res.status(404).json("Post not found");
                }
                return res.status(200).json("Post deleted successfully");

            } catch (err) {
                console.error("Error during deleting update:", err);
                return res.status(500).json("An error occurred while deleting the post.");
            }
        } else {
            return res.status(403).json("You can only delete your own post.");
        }

    } catch (err) {
        console.error("Error during post deletion:", err);
        return res.status(500).json("An error occurred while deleting the post.");
    }

});


//GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate("categories");
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json(err);
    }
});

// Post by userId
router.get("/users/:userId/posts", async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });

        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching user posts:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// GET POST BY ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("categories genres author"); // opcional: populate genres también
        if (!post) {
            return res.status(404).json("Post not found");
        }
        res.status(200).json(post);
    } catch (err) {
        console.error("Error finding post:", err);
        res.status(500).json(err);
    }
});

// GET POST
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