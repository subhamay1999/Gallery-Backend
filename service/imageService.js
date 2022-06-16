const Image = require('../database/models/imageModel');
const { formatMongoData, checkObjectId } = require('../helper/dbHelper');
const constants = require('../constants');

const express = require('express');
const router = express.Router();

const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config();
const PORT = process.env.PORT;


const multer = require('multer');

const imagestorage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploadimage = multer({
    storage: imagestorage,
    limits: { fileSize: 1000000 }
})

router.use('/image', express.static('upload/images'));



module.exports.uploadImage = async (req, res) => {
    try {
        const file = req.files.photo;
        const title = req.body.title;
        const gallery_id = req.body.gallery_id;
        const user_id = req.user_id;
        let newImage;


        await uploadimage.single('image', (err, result) => {
            const profile_url = `http://localhost:${PORT}/image/${req.file.filename}`;
        })

        await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            console.log(result);
            const fileurl = result.url;
            console.log(fileurl);
            const imagePath = result.url;
            newImage = new Image({ title, gallery_id, user_id, imagePath });
            newImage.save();
            console.log(newImage);
        })
        let results = newImage;
        return formatMongoData(results);
    } catch (error) {
        console.log('Something went wrong: Service: Upload Image', error);
        throw new Error(error);
    }
}

module.exports.getAllImages = async ({ gallery_id, skip = 0, limit = 100 }) => {
    try {
        let images = await Image.find({ gallery_id: gallery_id }).skip(parseInt(skip)).limit(parseInt(limit));
        console.log(images);
        return formatMongoData(images);
    } catch (error) {
        console.log('Something went wrong: Service: getAllImages', error);
        throw new Error(error);
    }
}

module.exports.getImageById = async ({ id }) => {
    try {
        checkObjectId(id);
        let image = await Image.findById(id);
        if (!image) {
            throw new Error(constants.imageMessage.IMAGE_NOT_FOUND);
        }
        return formatMongoData(image);
    } catch (error) {
        console.log('Something went wrong: Service: getImageById', error);
        throw new Error(error);
    }
}

module.exports.updateImage = async ({ id, updateInfo }) => {
    try {
        checkObjectId(id);
        let image = await Image.findOneAndUpdate(
            { _id: id },
            updateInfo,
            { new: true }
        )
        if (!image) {
            throw new Error(constants.imageMessage.IMAGE_NOT_FOUND);
        }
        return formatMongoData(image);
    } catch (error) {
        console.log('Something went wrong: Service: updateImage', error);
        throw new Error(error);
    }
}

module.exports.deleteImage = async ({ id }) => {
    try {
        checkObjectId(id);
        let image = await Image.findByIdAndDelete(id);
        if (!image) {
            throw new Error(constants.imageMessage.IMAGE_NOT_FOUND);
        }
        return formatMongoData(image);
    } catch (error) {
        console.log('Something went wrong: Service: deleteImage', error);
        throw new Error(error);
    }
}