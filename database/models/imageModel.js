
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: String,
    gallery_id: String,
    user_id: String,
    imagePath: String
},


    {
        timestamps: true,

        toObject: {
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });

module.exports = mongoose.model('Image', imageSchema);
