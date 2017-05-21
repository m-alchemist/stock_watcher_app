const express = require('express');
const http=require('http');
const app = express()
const port= process.env.PORT || 8080;
const path=require('path');
const bodyParser=require('body-parser');
const webpack=require('webpack');
const webpackDevMiddleware=require('webpack-dev-middleware');
const webpackConfig=require('./webpack.config')
const mongoose=require('mongoose');
const server=http.createServer(app);
const socketIo= require('socket.io')
const io=socketIo(server);
const Stock=require('./src/models/current_stock')

mongoose.connect('mongodb://heroku_552dtqpc:283eh0hhobasg2ivepk3l9uj4d@ds147681.mlab.com:47681/heroku_552dtqpc')

app.use(express.static(__dirname));

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'index.html'))
});

  app.use(bodyParser.urlencoded({extends:false}));

io.on('connection',socket=>{
  Stock.find({}).exec(function(err,docs){
    var arr=[]
    docs.map(function(doc){
      arr.push(doc.ticker);
    })
    console.log(arr);
    socket.emit('stockHistory',arr)
  })
  socket.on('addStock',body=>{
    socket.broadcast.emit('addStock',body)
    var stock=new Stock({ticker:body})
    stock.save();
  })
  socket.on('removeStock',body=>{
    socket.broadcast.emit('removeStock',body)
    Stock.findOneAndRemove({ticker:body},function(err,success){
      if(err){
     console.log(err);
   }
     else {
       console.log('successfully removed')
     }


    });
  })
})

// configure your socket.io instance here

server.listen(port);
console.log("server stated on port ", port)
