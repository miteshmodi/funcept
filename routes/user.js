const router = require('express').Router();
const userManager = require('../controllers/user.controller');

router.post('/login', async (req, res) => {
    try {
        let user = null;
        user = await userManager.getByUsername(req.body.username);
        if (!user)
            user = await userManager.getByEmail(req.body.username);

        if(!user)
            return res.status(400).send(`User does not exists with this username or email.`);

        if (req.body.password === user.password) {
            return res.status(200).send(user);
        } else {
            return res.status(400).send(`Password did not match.`);
        }
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/signup', async (req, res) => {
    try {
        let user = await userManager.getByUsername(req.body.username);
        if (user)
            return res.status(400).send(`User already exists with this username.`);

        user = await userManager.getByEmail(req.body.email);
        if (user)
            return res.status(400).send(`User already exists with this email.`);

        user = await userManager.create({...req.body});
        return res.status(200).send(user);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/up/:id', async (req, res) => {
    try {
        const t = await userManager.updatePassword(req.params.id, { ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/ua/:id', async (req, res) => {
    try {
        const t = await userManager.updateProfile(req.params.id, { ...req.body });
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const t = await userManager.list(req.body.keyword || '');
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/following', async (req, res) => {
    try {
        const t = await userManager.following(req.body.keyword || '', req.body.userId);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.post('/follower', async (req, res) => {
    try {
        const t = await userManager.followers(req.body.keyword || '', req.body.userId);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const t = await userManager.getById(req.params.id);
        return res.status(200).send(t);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});

module.exports = router;