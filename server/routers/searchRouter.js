const router = express.Router();

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/search', async (req, res) => {
    try {
        const search = await Search.find({ title: { $regex: req.query.title } })
            .limit(10)
            .select('title author img user');
        res.json({ search });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
