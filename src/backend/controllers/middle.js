const redirectprofile = (req, res, next) => {
    if (req.session.email) {
        console.log("yess")
      res.redirect("/");
    } else {
      next();
    }
  };
  
  module.exports = {
	redirectprofile: redirectprofile
}