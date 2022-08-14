const ex=require('express')
const r=ex.Router()
const mysql=require("../database/mysql")

r.get("/",(req,res)=>{
    if (!req.cookies.user_app_login) {
        res.redirect("login")
     }else{
    var data=JSON.parse(req.cookies.user_app_login)
    res.render("home",{firstname : data.firstname , id:data.id})
     }
})

r.get("/user",(req,res)=>{
    if (!req.cookies.user_app_login) {
        res.redirect("http://localhost:8080/login")
     }else{
    var sql=`SELECT firstname,lastname,email FROM users WHERE id='${req.query.id}'`
    mysql.query(sql,(err,result)=>{
       var cn= result[0].firstname + " " +result[0].lastname
        res.render("user",{cn: cn  , fn:result[0].firstname , ln:result[0].lastname , em:result[0].email})
    })}
})
module.exports = r


