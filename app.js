const express=require('express');
const team=require('./data')
const port=3000;
const app=express();


app.listen(port, () => {
    console.log("Server running on port 3000");
    console.log(team); //checking my data 
   });

app.get('/',function(req, res){
    console.log('/home was requested'); 
    res.send(team)
})