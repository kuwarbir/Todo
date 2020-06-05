
const dbConnection = require('../databases/sqlite.js');
const users = dbConnection.users;
function signup(req, res) {
  const { name, email, password } = req.body;    
  console.log(req.body)     
  users.findOne({ where: { email: req.body.email } }).then(function (user) {
    if (user) {
      return res.render("signup", {                     
        msg: "Account already exist, kindly log in "
      });
    }
  else {
    users.create({ 
        name,
        email,
        password
      })
        .then(user => { 
          console.log(user);      
          if (user) {
            req.session.email=user.dataValues.name; 
            req.session.name=user.dataValues.email;
            req.session.password=user.dataValues.password;//get email from form body
            req.session.id=user.dataValues.id
            console.log(user);
            return res.render("profile", {        
              msg: "user successfully created",
              user: user.name
            });
          }
        })
        .catch(err => {
          return res.render("profile", { msg: "Error in creating user" });
        });
   
    res.redirect("/")
//     console.log(req.session.email); // here i can get my email in console 
//     users.create({ 
//       name,
//       email,
//       password
//     })
//       .then(users => { 
// 		console.log(users);      
//         if (users) {
//           console.log(users);
//           return res.render("profile", {        
//             msg: "users successfully created",
//             users: users.name
//           });
//         }
//       })
//       .catch(err => {
//         return res.render("profile", { msg: "Error in creating users" });
//       });
//   }
  }
});
}
module.exports = {
	signup: signup
}