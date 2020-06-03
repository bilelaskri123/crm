const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require ('passport')
const userModel = require ('../Models/facebook')
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  
  new FacebookStrategy(
    {
      clientID: "your id ",
      clientSecret: "your scret",
      callbackURL: "your url callback",
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name, id  } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name,
        accessToken: accessToken,
        facebookID : id
      };
      new userModel(userData).save();    
      done(null, profile);
    }
  )
);