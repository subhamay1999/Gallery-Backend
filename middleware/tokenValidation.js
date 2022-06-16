

const constants = require('../constants');
const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken');


module.exports.validateToken = (req, res, next) => {
  let response = { ...constants.defaultServerResponse };
  try {
    if (!req.headers.authorization) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
    }
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');

    // decoded user id here 
    const userid = decoded.id;
    console.log('Decoded user id is (from Token Validation):  ', userid);

    console.log('Token id is  (from Token Validation):  ', token);


    return next();
    // return next();
  } catch (error) {
    console.log('Error', error);
    response.message = error.message;
    response.status = 401;
  }
  return res.status(response.status).send(response);
}

module.exports.verifydbtoken = async (req, res, next) => {
  let response = { ...constants.defaultServerResponse };
  try {
    if (!req.headers.authorization) {
      throw new Error(constants.requestValidationMessage.TOKEN_MISSING);
    }
    const receivedtoken = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(receivedtoken, process.env.SECRET_KEY || 'my-secret-key');

    // decoded user id here 
    const user_id = decoded.id;
    console.log('Decoded user id is (from Database Token Validation):  ', user_id);

    console.log('Token id is  (from Database Token Validation):  ', receivedtoken);


    console.log('User data from token validation......');
    const user = await User.findById({ _id: user_id })

    const tokens = user.tokens;
    console.log(tokens);
    const tokenlength = tokens.length;
    console.log('Length of token array is .... ', tokenlength);

    let flag = 0;

    for (let i = 0; i < tokenlength; i++) {
      console.log(tokens[i].token, '\n');
      if (receivedtoken == tokens[i].token) {
        flag++;
        break;
      }
    }

    console.log('Value of flag is ', flag);
    if (flag >= 1) {
      return next();
    }
    else {
      throw new Error(constants.requestValidationMessage.INVALID_TOKEN);
    }




    // return next();
  } catch (error) {
    console.log('Error', error);
    response.message = error.message;
    response.status = 401;
  }
  return res.status(response.status).send(response);
}