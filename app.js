const express=require('express');
const data=require('/data')
const port=3000;
const app=express();


app.listen(port, () => {
    console.log("Server running on port 3000");
    console.log(data); //checking my data 
   });

app.get('/',function(req, res){
    console.log('/home was requested'); 
    res.send(data)
})