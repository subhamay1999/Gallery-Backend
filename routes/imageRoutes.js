const express = require('express');
const router = express.Router();
const imageController = require('../controller/imageController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const imageSchema = require('../apiSchema/imageSchema');
const tokenValidation = require('../middleware/tokenValidation');
const Image = require('../database/models/imageModel');
const Profilepic = require('../database/models/profilepicModel');

const jwt = require('jsonwebtoken');

const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config();
const PORT = process.env.PORT;
let imageUrl;
let newImage;

const multer = require('multer');
const constants = require('../constants');

const imagestorage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const profilepicstorage = multer.diskStorage({
    destination: './upload/profilepics',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploadimage = multer({
    storage: imagestorage,
    limits: { fileSize: 1000000 }
})

const uploadprofilepic = multer({
    storage: profilepicstorage,
    limits: { fileSize: 1000000 }
})

router.use('/image', express.static('upload/images'));
/* router.use('/profilepic', express.static('upload/profilepics'));*/

router.post('/',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    uploadimage.single('photo'), async (req, res) => {
        const token = req.headers.authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
        const user_id = decoded.id;
        const title = req.body.title;
        const gallery_id = req.body.gallery_id;
        let result = await res.json({
            status: 200,
            message: constants.imageMessage.IMAGE_CREATED,
            Image_url: `http://${process.env.localhost}:${PORT}/image/${req.file.filename}`
        })
        if (!result) {
            console.log('Image not uploaded!');
        }
        else {
            console.log('Image upload successful');
            imageUrl = `http://${process.env.localhost}:${PORT}/image/${req.file.filename}`;

            const imagePath = imageUrl;
            newImage = new Image({ title, gallery_id, user_id, imagePath });

            newImage.save();
            console.log(newImage);
        }
    })

router.post('/profilepic',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    uploadprofilepic.single('profilepic'), async (req, res) => {
        const token = req.headers.authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
        const user_id = decoded.id;
        let result = await res.json({
            status: 200,
            message: constants.profilepicMessage.PROFILEPIC_CREATED,
            Image_url: `http://${process.env.localhost}:${PORT}/profilepic/${req.file.filename}`
        })
        if (!result) {
            console.log(constants.profilepicMessage.PROFILEPIC_NOT_UPLOADED);
        }
        else {
            console.log(constants.profilepicMessage.PROFILEPIC_CREATED);
            imageUrl = `http://${process.env.localhost}:${PORT}/profilepic/${req.file.filename}`;

            const profilepicPath = imageUrl;
            newImage = new Profilepic({ user_id, profilepicPath });

            newImage.save();
            console.log(newImage);
        }
    })


router.post('/imgtest',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    joiSchemaValidation.validateBody(imageSchema.createImageSchema),
    imageController.createImage
);

router.get('/:id',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    imageController.getImageById
);

router.put('/:id',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    joiSchemaValidation.validateBody(imageSchema.updateImageSchema),
    imageController.updateImage
);



router.post('/getallimage',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    joiSchemaValidation.validateBody(imageSchema.getAllImageSchema),
    imageController.getAllImages
);

router.delete('/:id',
    tokenValidation.validateToken,
    tokenValidation.verifydbtoken,
    imageController.deleteImage
)

module.exports = router;