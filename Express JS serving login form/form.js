const express = require('express');
// to get the data from post method we have to install and require body parser
const bodyParser =  require('body-parser');
const {check, validationResult } = require('express-validator');
const {matchedData , sanitizeBody} = require('express-validator')
const app = express();

app.set('view engine', 'twig');
app.set('views','./public/views');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(urlencodedParser);
var jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/',(req,res)=>{
    res.render('homeform',{title:"Login Form", message:"Enter Username and Password"});

})

app.post('/',urlencodedParser,[ 
    check('username', 'Username should be email id').isEmail(),
    check('password','password must be in 5 characters').isLength({min:5}),
    check('cpassword').custom((value, { req })=> {
        if(value != req.body.password){
            throw new Error("password confirmation doesn't match password" );
        }
        return true;
    })
],(req,res)=>{
    const errors = validationResult(req);  //use for prevent un-display username when password type uncondition. 
    console.log(errors.mapped());  //use map for diplay all eror like array

    if(!errors.isEmpty()){
        const users = matchedData(req);
        res.render('homeform',{title:"USER IS NOT AUTHENTICATE", error:errors.mapped(), user:users });
    }else{
        const users = matchedData(req);
        console.log(users);
        res.render("loginform",{title: 'User Details', user:users })
    }

})


app.listen(8000,()=>{
    console.log('listening');
})
