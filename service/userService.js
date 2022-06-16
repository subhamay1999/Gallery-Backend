const User = require('../database/models/userModel');
const Image = require('../database/models/imageModel');
const constants = require('../constants');
const { formatMongoData } = require('../helper/dbHelper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profilepic = require('../database/models/profilepicModel')
const { findById } = require('../database/models/userModel');

module.exports.signup = async ({ name, email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error(constants.userMessage.DUPLICATE_EMAIL);
    }
    password = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password });
    let result = await newUser.save();
    console.log(result);
    return formatMongoData(result);

  } catch (error) {
    console.log('Something went wrong: Service: signup', error);
    throw new Error(error);
  }
}

module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    console.log(user);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error(constants.userMessage.INVALID_PASSWORD);
    }
    const name = user.name;
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || 'my-secret-key', { expiresIn: '1d' });

    let oldTokens = user.tokens || []


    if (oldTokens.length) {
      oldTokens = oldTokens.filter(t => {
        const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
        if (timeDiff < 86400) {
          return t
        }
      })
    }
    await User.findByIdAndUpdate(user._id, { tokens: [...oldTokens, { token, signedAt: Date.now().toString() }] })

    return { name, token };
  } catch (error) {
    console.log('Something went wrong: Service: login', error);
    throw new Error(error);
  }

}

module.exports.getalluser = async () => {
  try {
    let userdata = await User.find({}, { name: 1, _id: 0 });

    if (!userdata) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    console.log(userdata);
    return formatMongoData(userdata);
  } catch (error) {
    console.log('Something went wrong: Service: getalluser', error);
    throw new Error(error);
  }
}

module.exports.getalluserimage = async ({ user_id }) => {
  try {
    // console.log("Here is user id ", user_id);
    let userimagedata = await Image.find({ user_id: user_id });

    if (!userimagedata) {
      throw new Error(constants.userMessage.IMAGE_NOT_FOUND);
    }
    console.log(userimagedata);
    return formatMongoData(userimagedata);
  } catch (error) {
    console.log('Something went wrong: Service: getallimage', error);
    throw new Error(error);
  }
}

module.exports.getprofilepic = async (req) => {
  let userimagedata=[];
  try {
    
    const u_id=req.user_id;
    console.log("Here is user id ", u_id);
    userimagedata = await Profilepic.find({ user_id: u_id });

    const size = Object.keys(userimagedata).length;
    console.log('Size of profile data is ' + size);
    // console.log(userimagedata[size - 1]);
    // return formatMongoData(userimagedata[size - 1]);


    if (size>=1) {
      console.log(userimagedata[size-1]);
      return([userimagedata[size-1]]);
    }
else{
  return(userimagedata);
}


  } catch (error) {
    console.log('Something went wrong: Service: getallimage', error);
    throw new Error(error);
  }
}

module.exports.editprofileget = async ({ user_id }) => {
  try {
    let userdata = await User.findById(user_id);
    if (!userdata) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    console.log(userdata);
    return formatMongoData(userdata);
  } catch (error) {
    console.log('Something went wrong: Service: getUserById', error);
    throw new Error(error);
  }
}


module.exports.editprofilepost = async (req, res) => {
  try {
    user_id = req.user_id;
    let userdata = await User.findById(user_id);
    if (!userdata) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    let passwordencrypted = await bcrypt.hash(req.password, 12);
    let updatedresult = await User.updateOne({ _id: user_id }, {
      $set: {
        name: req.name,
        email: req.email,
        password: passwordencrypted
      }
    },
      { new: true });


    console.log(updatedresult);
    //return result to user after saving
    let usernewdata = await User.findById(user_id);
    return (usernewdata);
  } catch (error) {
    console.log('Something went wrong: Service: getUserById', error);
    throw new Error(error);
  }
}