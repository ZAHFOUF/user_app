const ex=require('express')
const r=ex.Router()
const mysql=require("../database/mysql")

r.get("/",(req,res)=>{
    if (req.cookies.user_app_login) {
        res.redirect("home")
     }else{
    res.render("register")
     }
})

r.get("/cheack",(req,res)=>{
     var email=req.query.email
     var sql = `SELECT email FROM users WHERE email='${email}'`;
     mysql.query(sql, function (err, result) {
         if (err) throw err;
         if (result[0]) {
            var js_res={exist:"true"}
            res.send(js_res)
         //   res.writeHead(200,{"Content-Type" : "application/json"})
          //  res.end()
         }else if (!result[0]){
            var js_res={exist:"false"}
            res.send(js_res)
          //  res.writeHead(200,{"Content-Type" : "application/json"})
           // res.end()
         }
     });
})

module.exports = r
