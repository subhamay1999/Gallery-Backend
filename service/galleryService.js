
const Gallery = require('../database/models/galleryModel');
const Image=require('../database/models/imageModel');
const { formatMongoData, checkObjectId } = require('../helper/dbHelper');
const constants = require('../constants');

module.exports.createGallery = async (serviceData) => {
    try {
        let gallery = new Gallery({ ...serviceData });
        let result = await gallery.save();
        return formatMongoData(result);

    } catch (error) {
        console.log('Something went wrong: Service: createGallery', error);
        throw new Error(error);
    }
}

module.exports.getAllGallerys = async ({ user_id, skip = 0, limit = 100 }) => {
    try {
        let gallerys = await Gallery.find({ user_id: user_id }).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(gallerys);
    } catch (error) {
        console.log('Something went wrong: Service: getAllGallerys', error);
        throw new Error(error);
    }
}

module.exports.getGalleryById = async ({ id }) => {
    try {
        checkObjectId(id);
        let gallery = await Gallery.findById(id);
        if (!gallery) {
            throw new Error(constants.galleryMessage.GALLERY_NOT_FOUND);
        }
        return formatMongoData(gallery);
    } catch (error) {
        console.log('Something went wrong: Service: getGalleryById', error);
        throw new Error(error);
    }
}

module.exports.updateGallery = async ({ id, updateInfo }) => {
    try {
        checkObjectId(id);
        let gallery = await Gallery.findOneAndUpdate(
            { _id: id },
            updateInfo,
            { new: true }
        )
        if (!gallery) {
            throw new Error(constants.galleryMessage.GALLERY_NOT_FOUND);
        }
        return formatMongoData(gallery);
    } catch (error) {
        console.log('Something went wrong: Service: updateGallery', error);
        throw new Error(error);
    }
}

module.exports.deleteGallery = async ({ id }) => {
    try {
        checkObjectId(id);
        let gallery_id=await Gallery.findById(id);
        let image = await Image.find({gallery_id:gallery_id.id});
        for(i=0;i<image.length;i++){
            await Image.findByIdAndDelete(image[i].id);
        }
        let gallery = await Gallery.findByIdAndDelete(id);
        if (!gallery) {
            throw new Error(constants.galleryMessage.GALLERY_NOT_FOUND);
        }
        return formatMongoData(gallery);
    } catch (error) {
        console.log('Something went wrong: Service: deleteGallery', error);
        throw new Error(error);
    }
}