import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({
        msg: 'Express on Vercel',
    });
});

export default router;