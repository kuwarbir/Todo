
const dbConnection = require('../databases/sqlite.js');
const users = dbConnection.users;
var express = require("express");



function signin(req, res) {
  users.findOne({ where: { email: req.body.email,password:req.body.password } }).then(function (user) {
    if (!user) {
        res.render("signin",{
          msg:"email or password is incorrect"
        });
    } 
    else{
      console.log(user)
      req.session.email=user.dataValues.email; //get email from form body
      req.session.password=user.dataValues.password; //get email from form body
      req.session.uid=user.dataValues.id;
      req.session.name=user.dataValues.name;


       res.redirect("/")
    }
});
 
}
module.exports = {
	signin: signin
}