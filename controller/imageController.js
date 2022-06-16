const jwt = require('jsonwebtoken');
const imageService = require('../service/imageService');
const constants = require('../constants');
const { response } = require('express');
const imageRoutes = require('../routes/imageRoutes')


module.exports.uploadImage = async (imageUrl, req, res) => {
    // imageService.uploadImage();
    const imgUrl = imageUrl;

    // const imgUrl = `http://localhost:${PORT}/image/${req.file.filename}`;
    console.log('Imageurl from image controller...');
    console.log(imgUrl);

}


// module.exports.uploadImage = async (req, res) => {
//     let response = { ...constants.defaultServerResponse };
//     try {
//         const token = req.headers.authorization.split('Bearer')[1].trim();
//         const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
//         req.user_id = decoded.id;
//         console.log('ImageController:createImage ' + decoded.id);

//         const responseFromService = await imageService.uploadImage(req);
//         response.status = 200;
//         response.message = constants.imageMessage.IMAGE_CREATED;
//         response.body = responseFromService;
//     } catch (error) {
//         console.log('Something went wrong: Controller: createImage', error);
//         response.message = error.message;
//     }
//     return res.status(response.status).send(response);
// }

module.exports.createImage = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const token = req.headers.authorization.split('Bearer')[1].trim();
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
        req.user_id = decoded.id;
        console.log('ImageController:createImage ' + decoded.id);

        const responseFromService = await imageService.createImage(req);
        response.status = 200;
        response.message = constants.imageMessage.IMAGE_CREATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: createImage', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getAllImages = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await imageService.getAllImages(req.body);
        response.status = 200;
        response.message = constants.imageMessage.IMAGE_FETCHED;
        response.body = responseFromService;
        console.log(responseFromService);
    } catch (error) {
        console.log('Something went wrong: Controller: getAllImages', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.getImageById = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await imageService.getImageById(req.params);
        response.status = 200;
        response.message = constants.imageMessage.IMAGE_FETCHED;
        response.body = responseFromService;
        console.log(responseFromService);
    } catch (error) {
        console.log('Something went wrong: Controller: getImageById', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.updateImage = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await imageService.updateImage({
            id: req.params.id,
            updateInfo: req.body
        });
        response.status = 200;
        response.message = constants.imageMessage.IMAGE_UPDATED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: updateImage', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}

module.exports.deleteImage = async (req, res) => {
    let response = { ...constants.defaultServerResponse };
    try {
        const responseFromService = await imageService.deleteImage(req.params);
        response.status = 200;
        response.message = constants.imageMessage.IMAGE_DELETED;
        response.body = responseFromService;
    } catch (error) {
        console.log('Something went wrong: Controller: deleteImage', error);
        response.message = error.message;
    }
    return res.status(response.status).send(response);
}