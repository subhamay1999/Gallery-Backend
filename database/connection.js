
const mongoose = require('mongoose');


module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log('Database Connected Successfully');
  } catch (error) {
    console.log('Database Connection Unsuccessful! Try Again', error);
    throw new Error(error);
  }
}

