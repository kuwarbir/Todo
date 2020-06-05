const express = require('express');
const mainController = require('../controllers/MainController');
const SignUpController =require('../controllers/SignUpController')
const SignInController =require('../controllers/SignInController')
const middle =require("../controllers/middle")
const router = express.Router();
const app = express();

router.route('/').get(mainController.home);
router.route('/signup').get(middle.redirectprofile,mainController.signup)
router.route('/signin').get(middle.redirectprofile,mainController.signin)
router.route('/signup').post(SignUpController.signup)
router.route('/signin').post(SignInController.signin)
router.route('/').post(mainController.home);
router.route('/delete/:id').get(mainController.deletetodo)
router.route('/signout').get(mainController.signout)
router.route('/edit/:id').get(mainController.edittodo)
router.route('/update/:id').post(mainController.updatetodo)
router.route('/done/:id').get(mainController.donetodo)
router.route('/notdone/:id').get(mainController.notdonetodo)

module.exports = router;
