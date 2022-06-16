module.exports = {
  defaultServerResponse: {
    status: 400,
    message: '',
    body: {}
  },
  profilepicMessage: {
    PROFILEPIC_TABLE_FETCHED: 'Profile Picture Table Fetched Successfully',
    PROFILEPIC_CREATED: 'Profile Picture Uploaded Successfully',
    PROFILEPIC_NOT_UPLOADED: 'Prifile picture not uploaded..',
    PROFILEPIC_FETCHED: 'Profile Picture Fetched Successfully',
    PROFILEPIC_UPDATED: 'Profile Picture Updated Successfully',
    PROFILEPIC_DELETED: 'Profile Picture Deleted Successfully',
    PROFILEPIC_NOT_FOUND: 'Profile Picture Not Found'
  },
  imageMessage: {
    IMAGE_TABLE_FETCHED: 'Image Table Fetched Successfully',
    IMAGE_CREATED: 'Image Uploaded Successfully',
    IMAGE_FETCHED: 'Image Fetched Successfully',
    IMAGE_UPDATED: 'Image Updated Successfully',
    IMAGE_DELETED: 'Image Deleted Successfully',
    IMAGE_NOT_FOUND: 'Image Not Found'
  },

  galleryMessage: {
    GALLERY_CREATED: 'Gallery Created Successfully',
    GALLERY_FETCHED: 'Gallery Fetched Successfully',
    GALLERY_UPDATED: 'Gallery Updated Successfully',
    GALLERY_DELETED: 'Gallery Deleted Successfully',
    GALLERY_NOT_FOUND: 'Gallery Not Found'
  },

  userMessage: {
    IMAGE_NOT_FOUND: 'Image Not Found',
    IMAGE_TABLE_FETCHED: 'Image Table Fetched Successfully',
    GET_ALL_USER_SUCCESS: 'All user name fetched successfully',
    EDITPROFILE_FETCH_SUCCESS: 'Profile Fetched Successfully',
    EDITPROFILE_SAVE_SUCCESS: 'Profile Updated Successfully',
    LOGOUT_SUCCESS: 'Logged Out Successfully',
    SIGNUP_SUCCESS: 'Signup Success',
    LOGIN_SUCCESS: 'Login Success',
    DUPLICATE_EMAIL: 'User already exist with given email',
    USER_NOT_FOUND: 'User not found',
    INVALID_PASSWORD: 'Incorrect Password'
  },
  requestValidationMessage: {
    BAD_REQUEST: 'Invalid fields',
    TOKEN_MISSING: 'Token missing from header',
    INVALID_TOKEN: 'Session Expired! Sign-in again'
  },
  databaseMessage: {
    INVALID_ID: 'Invalid Id'
  }
}