const router = require('express').Router();
const followManager = require('../controllers/follow.controller');

router.get('/post/:id', async (req, res) => {
    try {
        const t = await followManager.getByPost(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const t = await followManager.getByUser(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/check', async (req, res) => {
    try {
        const p = await followManager.check({...req.body});
        return res.status(200).send(p);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const p = await followManager.check({...req.body});
        if(p.length > 0)
            return res.status(400).send(`Already following.`);

        const t = await followManager.create({ ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/remove', async (req, res) => {
    try {
        const t = await followManager.removeFollowing({ ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const r = await followManager.delete(id);
        return res.status(200).send(r);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;