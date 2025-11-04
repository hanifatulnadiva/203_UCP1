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