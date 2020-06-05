
const express=require("express")
const dbConnection = require('../databases/sqlite.js');
const users = dbConnection.users;
const lists=dbConnection.lists;
var todolist=[
	
]
function getlist()
{
    return todolist;
}
    function home(req, res) {
       let sess=req.session
       var date;
       if(req.session.email)
       {
         let name=req.session.name
        let mail=req.session.email
        let {uid}=req.session
        let {item}=""
        let {done}="";
        let {edit}=false;
        console.log("user is ",uid)
       
       if(req.body.todo)
       {
        console.log(req.body.todo)
       var todo=req.body.todo;
       date=req.body.date;
      
     //  console.log(todo)
    //  todolist.push(todo)
     // console.log(todolist)
      lists.create({ 
        item:todo,
        edit,
        done,
        uid,
        date
      }).then(list => { 
       console.log("added");      
    })
      .catch(err => {
          console.log(err)
      }); 

}


lists.findAll({
    where: {
      uid:uid
    }
  }).then(todoList=>
    {
console.log("final list",todoList)
res.render("profile",{
    todolist:todoList,
   mail:mail,
   name:name,
   done:done,
   date:date

});
    })
     
    }
    else{
        res.redirect("/signin")
    }
    }
    
    function signup(req, res) {
todolist=[];
      res.render("signup",{
      msg:""
    });
    }
    
    function signin(req, res) {
        res.render('signin',{
          msg:""
        });
    }

    function deletetodo(req,res)
    {
      let id=req.params.id;
      lists.destroy({
        where: {
          id:id
        }
      }).then(todoList=>
        {
    //console.log("final list",todoList)
    res.redirect("/",);
    });
  }
  function edittodo(req,res)
{
  console.log("in edit")
        lists.update({ 
                edit:req.params.id
              },
              {
                  where :
                  {
                      id:req.params.id
                  }
              }).then(list => { 
                console.log(list.item); 
            })
              .catch(err => {
                  console.log(err)
              });
              res.redirect("/",);

            
}
function updatetodo(req,res)
{
  console.log("biody",req.body)
  const edit=Math.random();

  if(req.body.todo!="")
  {
  console.log("edit is",edit)
  const {todo}=req.body
  lists.update({ 
    item:todo,
    edit:edit
  },
  {
      where :
      {
          id:req.params.id
      }
  }).then(list => { 
    console.log(list.item); 
})
  .catch(err => {
      console.log(err)
  });
  res.redirect("/",);
}
else{
  lists.update({ 
    edit:edit
  },
  {
      where :
      {
          id:req.params.id
      }
  }).then(list => { 
    console.log(list.item); 
})
  .catch(err => {
      console.log(err)
  });
  res.redirect("/",);
}


}
function donetodo(req,res)
{
  console.log("####################################")
        lists.update({ 
                done:req.params.id
              },
              {
                  where :
                  {
                      id:req.params.id
                  }
              }).then(list => { 
                console.log(list.item); 
            })
              .catch(err => {
                  console.log(err)
              });
              res.redirect("/",);

            
}

function notdonetodo(req,res)
{
  console.log("####################################")
        lists.update({ 
                done:"not done"
              },
              {
                  where :
                  {
                      id:req.params.id
                  }
              }).then(list => { 
                console.log(list.item); 
            })
              .catch(err => {
                  console.log(err)
              });
              res.redirect("/",);

            
}


  
    function signout(req,res)
    {
        res.status(200).clearCookie('connect.sid', {
            path: '/'
          });
          req.session.destroy(function (err) {
              console.log(req.session,req.cookies)
            res.redirect('/');
          });

        // if (req.session.user && req.cookies.user_sid) {
        //     res.clearCookie('user_sid');
        //     res.redirect('/');
        // } else {
        //     res.redirect('/signin');
        // }
    }
    module.exports = {
          home: home,
          signin: signin,
          signup: signup,
         deletetodo: deletetodo,
         signout:signout,
         getlist:getlist,
         edittodo: edittodo,
         updatetodo:updatetodo,
         donetodo:donetodo,
         notdonetodo:notdonetodo

        };
    