const express=require('express');
const app=express();
const PORT= 3000;
const db = require('./models')

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.listen(PORT,()=>{
    console.log (`server is running on ${PORT}`)
})

db.sequelize.sync()
.then ((result)=>{
    app.listen(3000,()=>{
        console.log('server started');
    })
})

.catch((err)=>{
    console.log(err);
})

app.get("/film", async (req,res)=>{
    try{
        const film = await db.Film.findAll();
        res.send(film)
    }catch(err){
        res.send(err);
    }
});