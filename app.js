const express=require('express');
const team=require('./data')
const port=3000;
const app=express();


const bodyParser = require('body-parser') 
app.use(bodyParser.json()) //started to use body-parser
app.use(bodyParser.urlencoded({ extended: true })) //??


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(team); //checking my data 
   });

app.get('/',function(req, res){
    console.log('/home was requested'); 
    res.send(team)
})

app.get('/members',function(req, res){
    console.log('/members was requested'); 
    res.send(team.map(a=>a.member));
})

app.get('/member/:id',function(req, res){
    const requestedId=req.url.split('/')[2];
    console.log(`a certain member with id: ${requestedId} was requested`);
    res.send(people.filter(member=>member.id==requestedId))
})
app.post('/member',function(req, res){
    console.log(req.body);
    people.push(req.body);
    res.send(team);
})

app.put('/member/:id',function(req, res){
    const tobeUpdatedId=req.url.split('/')[2];
    people[tobeUpdatedId-1]=req.body;
    res.send(team);
})

app.delete('/member/:id',function(req, res){
    const tobeDeletedId=req.url.split('/')[2];
    res.send(team.filter(member=>member.id!=tobeDeletedId)); //not use !==
})