const mongoose = require ("mongoose");
const userSchema =  mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
   //required: true
  },
  accessToken: {
    type:String
  },
  // accounts: {
  //   type:String
  // }
  facebookID :{
    type:String
  },
  // twitterId:{
  //   type:String
  // }

});

module.exports  = mongoose.model("User", userSchema);