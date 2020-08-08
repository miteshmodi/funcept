const router = require('express').Router();
const dislikeManager = require('../controllers/dislike.controller');

router.get('/post/:id', async (req, res) => {
    try {
        const t = await dislikeManager.getByPost(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const t = await dislikeManager.getByUser(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/check', async (req, res) => {
    try {
        const p = await dislikeManager.check({...req.body});
        return res.status(200).send(p);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const p = await dislikeManager.check({...req.body});
        if(p.length > 0)
            return res.status(400).send(`Already liked.`);

        const t = await dislikeManager.create({ ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/remove', async (req, res) => {
    try {
        const t = await dislikeManager.deleteByPostAndUser({ ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const r = await dislikeManager.delete(id);
        return res.status(200).send(r);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;