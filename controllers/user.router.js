const express = require ('express')
const passport = require('passport')
const userController = require('../controllers/user.controller')
const router = express.Router();



router.get("/auth/facebook", passport.authenticate("facebook",{ scope: ['read_stream','user_friends', 'publish_actions'] }));
//login with facebook
router.get(
  "/auth/facebook/callback",
  //require('connect-ensure-login').ensureLoggedIn(),
  passport.authenticate("facebook", {
    
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);
// router.post('/auth/facebook/callback',
//       (passport.authenticate('facebook', { session: false }), userController.facebookOAuth))

router.get("/fail", (req, res) => {
  //res.send("Failed attempt");
  return res.json({
    success: false,
    message: "failed."
  });
});