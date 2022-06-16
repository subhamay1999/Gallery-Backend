const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');

const tokenValidation = require('../middleware/tokenValidation');

router.post('/signup',
  joiSchemaValidation.validateBody(userSchema.signup),
  userController.signup
);

router.post('/login',
  joiSchemaValidation.validateBody(userSchema.login),
  userController.login
)

router.get('/editprofileget',
  tokenValidation.validateToken,
  tokenValidation.verifydbtoken,
  userController.editprofileget
)

router.get('/getalluser',
  tokenValidation.validateToken,
  tokenValidation.verifydbtoken,
  userController.getalluser
)

router.get('/getalluserimage',
  tokenValidation.validateToken,
  tokenValidation.verifydbtoken,
  userController.getalluserimage
)


router.put('/editprofilepost',
  tokenValidation.validateToken,
  tokenValidation.verifydbtoken,
  userController.editprofilepost
)
router.get('/getprofilepic',
  tokenValidation.validateToken,
  tokenValidation.verifydbtoken,
  userController.getprofilepic
)

router.delete('/logout',
  tokenValidation.validateToken,
  userController.logout
)




module.exports = router;
