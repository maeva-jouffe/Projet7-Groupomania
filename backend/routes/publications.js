const express = require('express');
const router = express.Router();
const publicationsCtrl = require('../controllers/publications');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Créer une publication
router.post('/', auth, multer, publicationsCtrl.createPublication);

// //Modifier une publication
// router.put('/:id', auth, multer, publicationsCtrl.modifySauce);

// //Supprimer une publication
// router.delete('/:id', auth, publicationsCtrl.deleteSauce);

// //Récupérer la liste des publications
// router.get('/', auth, publicationsCtrl.getAllSauce);

// //Liker ou Disliker une publication
// router.post('/:id/like', auth, publicationsCtrl.sauceLike);

module.exports = router;