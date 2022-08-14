var al=document.querySelector("div.alert-danger")
var f1=document.querySelector("input.form3Example3")

f1.onchange=function(){
    var req= new XMLHttpRequest ()
    req.onreadystatechange=function(){
       if (req.status == 200 && req.readyState) {
            var res=JSON.parse(this.responseText)
            if (res.exist == "true") {
                al.classList.add("block")
            }
       }
    }
    req.open("GET",`http://localhost:8080/register/cheack?email=${f1.value}`,true)
    req.send()
}