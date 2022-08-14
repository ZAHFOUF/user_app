const ex=require('express')

const r=ex.Router()

const p=require("../package.json")

const crypto=require('crypto')



r.get("/",(req,res)=>{
    if (req.cookies.user_app_login) {
        res.redirect("home")
     }else{
    res.render("index",{title : p.author})
     }
})
module.exports = r
