const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser')
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/signupdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( ()=>{console.log('db is connected')
}).catch( (err)=>{
    console.log(err)
})
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ 
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static('public'));

app.post("/signup", (req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data ={
        "name" : name,
        "email": email,
        "phone":phone,
        "password":password

    }

    db.collection('users').insertOne(data,(err, collection)=>{
        if (err){
            throw err;
        }
        console.log("Record is inserted successfully")
    });
    return res.redirect('singnup_success.html');

})

app.get('/', (req, res)=>{
    res.render('index.js')
})

app.listen(port,()=>{
    console.log(`Server is running on port no ${port}`)
})