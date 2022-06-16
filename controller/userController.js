const constants = require('../constants');
const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');
const userService = require('../service/userService');


module.exports.signup = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.signup(req.body);
    response.status = 200;
    response.message = constants.userMessage.SIGNUP_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: signup', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.login = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.login(req.body);
    response.status = 200;
    response.message = constants.userMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: login', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.getalluser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.getalluser();
    response.status = 200;
    response.message = constants.userMessage.GET_ALL_USER_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: getalluser', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}
module.exports.getalluserimage = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
    const user_id = decoded.id;
    req.body.user_id = user_id;

    const responseFromService = await userService.getalluserimage(req.body);
    response.status = 200;
    response.message = constants.userMessage.IMAGE_TABLE_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: getalluser', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}

module.exports.logout = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]



    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication failed!' })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
    const user_id = decoded.id
    const user = await User.findById({ _id: user_id })
    const tokens = user.tokens;

    console.log('Fetching from Logout');
    console.log(tokens);

    const newTokens = tokens.filter(t => t.token != token)
    await User.findByIdAndUpdate(user_id, { tokens: newTokens })

    return res.json({ success: true, message: 'Sign out successfully' })
  }
}


// module.exports.logout = async (req, res) => {
//   let response = { ...constants.defaultServerResponse };
//   try {
//     const token = req.headers.authorization.split('Bearer')[1].trim();
//     const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');


//     const user_id = decoded.id;
//     const user = await User.findOne({ _id: user_id });

//     req.body.token = token;
//     req.body.user = user;

//     // userService.logout(req);

//     const responseFromService = await userService.logout(req.body);
//     response.status = 200;
//     response.message = constants.userMessage.LOGOUT_SUCCESS;
//     response.body = responseFromService;
//   } catch (error) {
//     console.log('Something went wrong: Controller: logout', error);
//     response.message = error.message;
//   }
//   return res.status(response.status).send(response);
// }

module.exports.editprofileget = async (req, res) => {

  let response = { ...constants.defaultServerResponse };
  try {
    let responseFromService;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split('Bearer')[1].trim();
      const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
      req.body.user_id = decoded.id;
      responseFromService = await userService.editprofileget(req.body);
      response.status = 200;
      response.message = constants.userMessage.EDITPROFILE_FETCH_SUCCESS;
    } else {
      response.status = 400;
      response.message = "You are not authrized";
    }
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: editprofileget', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);

}



module.exports.editprofilepost = async (req, res) => {

  let response = { ...constants.defaultServerResponse };
  try {
    let responseFromService;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split('Bearer')[1].trim();
      const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
      req.body.user_id = decoded.id;



      responseFromService = await userService.editprofilepost(req.body);
      response.status = 200;
      response.message = constants.userMessage.EDITPROFILE_SAVE_SUCCESS;
    } else {
      response.status = 400;
      response.message = "You are not authrized";
    }
    response.body = responseFromService;
  } catch (error) {
    console.log('Something went wrong: Controller: editprofilepost', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);

}


// module.exports.getprofilepic = async (req, res) => {

//   let response = { ...constants.defaultServerResponse };
//   try {
//     let responseFromService=[];
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split('Bearer')[1].trim();
//       const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
//       req.body.user_id = decoded.id;
//       responseFromService = await userService.getprofilepic(req.body);
//       response.status = 200;
//       response.message = constants.userMessage.EDITPROFILE_FETCH_SUCCESS;
//       response.body = responseFromService;
//     } 
    
//   } catch (error) {
//     console.log('Something went wrong: Controller: getprofilepic', error);
//     response.message = error.message;
//   }
//   // return res.status(response.status).send(response);
//   return response;

// }


module.exports.getprofilepic = async (req, res) => {

  let response = { ...constants.defaultServerResponse };
  try {
    let responseFromService=[];
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'my-secret-key');
    req.body.user_id = decoded.id;
    // userService.getprofilepic(req.body)

    responseFromService = await userService.getprofilepic(req.body);

    response.status = 200;
    response.message = constants.userMessage.EDITPROFILE_FETCH_SUCCESS;
    response.body = responseFromService;

   
    
  } catch (error) {
    console.log('Something went wrong: Controller: getprofilepic', error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
  // return response;

}