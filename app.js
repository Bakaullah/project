const express = require('express');
const app = express();
const MensRanking = require("../src/models/mens")
require("../src/db/conn"); // have to require conn.js in the main js file(app.js)

const port = process.env.PORT || 8000;
app.use(express.json());

app.post("/mens", async(req,res)=>{
    try{
        const addingMensRecord = new MensRanking(req.body);
        console.log(req.body);
        const insertMens = await addingMensRecord.save();
        res.status(200).send(insertMens);

    }catch(err){res.send(err)}
})

app.listen(port, ()=>{
    console.log(`connection is live at port no ${port}`);
})