const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = require('./auth.routes');
const { requireSignin } = require('../controllers/auth.controller');

const {
    like, 
    unlike
}
// likes/unlike

router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// for videos
router.put('/video/like', requireSignin, like);
router.put('/video/unlike', requireSignin, unlike);