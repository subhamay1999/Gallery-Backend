const Joi = require('@hapi/joi');

module.exports.createGallerySchema = Joi.object().keys({
    name: Joi.string().required()

});

module.exports.getAllGallerySchema = Joi.object().keys({
    skip: Joi.string(),
    limit: Joi.string()
});

module.exports.updateGallerySchema = Joi.object().keys({
    name: Joi.string(),
});
