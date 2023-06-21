const { Router } = require('express');
const router = Router();
const myBooksCtrl =  require('../controller/myBooks.controller');

router.post("/register", myBooksCtrl.registerUser);
router.post("/login", myBooksCtrl.loginUser);

module.exports = router;