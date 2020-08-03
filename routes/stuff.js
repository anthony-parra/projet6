const express = require('express');
const router = express.Router();

const stuffControllers = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffControllers.createSauce);
router.put('/:id', auth, multer, stuffControllers.modifySauce);
router.delete('/:id', auth, stuffControllers.deleteSauce);
router.get('/:id', auth, stuffControllers.getOneSauce);
router.get('/', auth, stuffControllers.getAllSauce);
router.post('/:id/like', auth, stuffControllers.likeOneSauce);

module.exports = router;