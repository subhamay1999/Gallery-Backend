const Joi = require('@hapi/joi');

module.exports.createImageSchema = Joi.object().keys({
    title: Joi.string().required(),
    gallery_id: Joi.string().required()

});

module.exports.getAllImageSchema = Joi.object().keys({
    gallery_id: Joi.string().required(),
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateImageSchema = Joi.object().keys({
    name: Joi.string(),
});

module.exports.uploadImageSchema = Joi.object().keys({
    title: Joi.string().required(),
    gallery_id: Joi.string().required()

});
