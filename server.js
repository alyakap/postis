const express=require('express');
const port=3000;

const server=express();

server.listen(port, () => {
    console.log("Server running on port 3000");
   });