const ex=require('express')
const r=ex.Router()
const mysql=require('../database/mysql')
const crypto=require('crypto')




r.get("/",(req,res)=>{
  if (req.cookies.user_app_login) {
     res.redirect("home")
  }else{
    res.render("login",{method : req.method , action : "login"})
  }
})

r.post("/",(req,res)=>{

  if (req.body.lastname) {
    var data=req.body

    var email=data.email
    var sql = `SELECT email FROM users WHERE email='${email}'`;
    mysql.query(sql, function (err, result) {
        if (err) throw err;


        
        if (result[0]) {
          res.redirect("/register")



        }else if (!result[0]){


              /* sql insert data */
       console.log(result);
        var id=crypto.randomUUID()
        var sql = `INSERT INTO users VALUES ('${id}','${data.firstname}','${data.lastname}','${data.email}','${data.password}')`;
        mysql.query(sql, function (err, result) {
          if (err){
            res.render("login",{ method : req.method , action : "register", result : "error" , error : err } )
          }else{
            res.render("login",{ method : req.method ,  action : "register" , result : "yes" , data : JSON.stringify(req.body)})
          }

        });



        }
    });
     

      
  }else if (req.body.email_login) {

      /* sql insert data */
     
        var data=req.body
        var sql = `SELECT id,firstname FROM users WHERE email='${data.email_login}' AND password='${data.password}'`;
        mysql.query(sql, function (err, result) {
            if (err) throw err;
            if (!result[0]) {
                res.render("login" , {method : req.method , action : "login",msg:"error"})
                console.log("Yes");
            }else if (result[0]){
              var data={login : 'yes' , id : result[0].id , firstname : result[0].firstname , lastname : result[0].lastname }
              var sdata=JSON.stringify(data)
              res.cookie("user_app_login" , sdata,{maxAge : 3600 * 60 * 24 * 30 * 12})
              res.redirect("/home")
            }
        });
        
      }else if (req.body.out) {
         res.clearCookie("user_app_login")
         res.render("login" , {method : req.method , action : "login" , msg:"true"})
        }


})
module.exports = r
