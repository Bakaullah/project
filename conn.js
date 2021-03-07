const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/olympics", { 
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology:true


}).then(() => {
    console.log("connection is successful")
    
}).catch((err) => {
    console.log( err, "No connection");
});