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

app.post("/film", async (req,res)=>{
    const data= req.body;
    try{
        const film = await db.Film.create(data);
        res.send({message:"data film berhasil dibuat",film})
    }catch(err){
        res.send(err);
    }
});


app.delete("/film/:id", async(req,res)=>{
    const id=req.params.id;
    try{
        const film=await db.Film.findByPk(id);
        if(!film){
            return res.status(404).send({Message: "Data film tidak di temukan"});
        }
        await film.destroy();
        res.send({Message:"Data berhasil di hapus"})

    }catch(err){
        res.status(500).send({message:"terjadi kesalahan saat delete data film", Error:err.message})
    }
});