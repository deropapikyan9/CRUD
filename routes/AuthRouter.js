const express = require('express');
const { registerView ,registerNewUser, loginView, loginUser, logOut} = require('../controllers/AuthController');
const router = express.Router();


router.get('/register',registerView);

// post router for register
router.post(`/register`,registerNewUser )


router.get('/login',loginView);

// post router for register
router.post(`/login`, loginUser )

router.get('/logOut',logOut);

module.exports = router;
