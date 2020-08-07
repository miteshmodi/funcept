const router = require('express').Router();
const postManager = require('../controllers/post.controller');
const likeManager = require('../controllers/like.controller');
const dislikeManager = require('../controllers/dislike.controller');
const userManager = require('../controllers/user.controller');
const followManager = require('../controllers/follow.controller');
const s3Manager = require('../controllers/s3.controller');

router.get('/:id', async (req, res) => {
    try {
        const t = await postManager.get(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const t = await postManager.getByUserId(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        if(req.files && req.files.file) {
            s3Manager.uploadFile(req.files.file, async result => {
                const t = await postManager.create({ ...req.body, ...result });
                return res.status(200).send(t);
            });
        }
        else {
            const t = await postManager.create({...req.body});
            return res.status(200).send(t);
        }
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/all', async (req, res) => {
    try {
        const t = await postManager.list(req.body.keyword || "", req.body.userId || null);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/following', async (req, res) => {
    try {
        let users = await userManager.following('', req.body.userId);
        users = users.map(x => `${x._id}`);
        const posts = await postManager.list(req.body.keyword || "", null);
        const filteredPosts = posts.filter(x => users.includes(`${x.userId._id}`));
        return res.status(200).send(filteredPosts);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/top', async (req, res) => {
    try {
        const t = await postManager.top();
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/:id', async (req, res) => {
    try {

        if(req.files && req.files.file) {
            s3Manager.uploadFile(req.files.file, async result => {
                const t = await postManager.update(req.params.id, { ...req.body, ...result });
                return res.status(200).send(t);
            });
        }
        else {
            const t = await postManager.update(req.params.id, { ...req.body });
            return res.status(200).send(t);
        }

    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await likeManager.deleteByPost(id);
        await dislikeManager.deleteByPost(id);
        const r = await postManager.delete(id);
        return res.status(200).send(r);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;