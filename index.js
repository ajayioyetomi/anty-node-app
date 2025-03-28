const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { updateTwitterData } = require('./controllers/twitterController');
require('dotenv').config();

// console.log({
//   appKey: process.env.APP_KEY,
//   appSecret: process.env.SECRET_KEY,
//   accessToken: process.env.ACCESS_KEY,
//   accessSecret: process.env.ACCESS_SECRET_KEY,
// })

const twitterRoutes = require('./routes/twitterRoutes');

const app = express();

if(process.env.NODE_ENV === 'production'){
    app.use(cors(
        {origin: '*'}
     ));
}
else{
    app.use(cors());
}
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use('/twitter',twitterRoutes);


app.get('/',(req,res)=>{
  res.send("Hello world, welcome to my world 😉")
})

app.all('/*',(req,res)=>{
  res.status(404).send({
       404: 'Not Found!'
   })
   //res.sendFile(path.join(__dirname,'static/error-page.html'))  
})

updateTwitterData();

if(process.env.NODE_ENV === 'production'){
    app.listen();
}
else{
    const port = process.env.PORT || 5000;
    app.listen(port, () =>{
        console.log(`Server started on port ${port}`)
    });
}
