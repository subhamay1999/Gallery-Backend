const galleryService = require('../service/galleryService');
const constants = require('../constants');
const jwt = require('jsonwebtoken');

module.exports.createGallery = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        let responseFromService;
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer')[1].trim();
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
            req.body.user_id = decoded.id;
            responseFromService = await galleryService.createGallery(req.body);
            response.status = 200;
            response.message = constants.galleryMessage.GALLERY_CREATED;
        } else {
            response.status = 400;
            response.message = "You are not authrized";
        }
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: createGallery', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getAllGallerys = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const token = req.headers.authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
        req.body.user_id = decoded.id;
        const responseFromService = await galleryService.getAllGallerys(req.body);
        response.status = 200;
        response.message = constants.galleryMessage.GALLERY_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getAllGallerys', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getGalleryById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await galleryService.getGalleryById(req.params);
        response.status = 200;
        response.message = constants.galleryMessage.GALLERY_FETCHED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: getGalleryById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateGallery = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await galleryService.updateGallery({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.galleryMessage.GALLERY_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateGallery', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteGallery = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await galleryService.deleteGallery(req.params);
        response.status = 200;
        response.message = constants.galleryMessage.GALLERY_DELETED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: deleteGallery', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}