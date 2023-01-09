const express = require('express')
const { createServer } = require("http")

const expressApp = express();
const httpServer = createServer(expressApp)
const port = process.env.PORT || 8001;

expressApp.use('/',express.static(__dirname + '/'));

expressApp.get("/", async (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

httpServer.listen(port, ()=>{
    console.log('HTTP Server listening on '+port)
  })