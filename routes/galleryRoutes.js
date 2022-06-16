const express = require('express');
const router = express.Router();
const galleryController = require('../controller/galleryController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const gallerySchema = require('../apiSchema/gallerySchema');
const tokenValidation = require('../middleware/tokenValidation');

router.post('/',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    joiSchemaValidation.validateBody(gallerySchema.createGallerySchema),
    galleryController.createGallery
);

router.get('/:id',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    galleryController.getGalleryById
);

router.put('/:id',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    joiSchemaValidation.validateBody(gallerySchema.updateGallerySchema),
    galleryController.updateGallery
);

router.get('/',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    joiSchemaValidation.validateQueryParams(gallerySchema.getAllGallerySchema),
    galleryController.getAllGallerys
);

router.delete('/:id',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    galleryController.deleteGallery
)

module.exports = router;