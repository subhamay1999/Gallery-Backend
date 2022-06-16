
const mongoose = require('mongoose');

const profilepicSchema = new mongoose.Schema({
    user_id: String,
    profilepicPath: String
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

module.exports = mongoose.model('Profilepic', profilepicSchema);
