const passport = require('passport');

module.exports = (app) => {
//sends user to Google OAuth
  app.get(
      "/auth/google",
      passport.authenticate("google", {
        scope: ["profile", "email"],
      })
    );
  //Redirects users on Callback  
    app.get("/auth/google/callback",
     passport.authenticate("google"),
     (req, res) =>{
       res.redirect('/portfolio');
     });
    //log out current user
    app.get('/api/logout', (req, res) =>{
      req.logout();
      res.redirect('/');
    });
    //gets current user
    app.get('/api/current_user', (req, res) => {
      res.send(req.user);
    });
};