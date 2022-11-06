const express=require('express');
const app=express();
const mongoose=require('mongoose');
const PORT=8080;
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');
const todoRoute=require('./routes/todo');




dotenv.config();
mongoose.
       connect(process.env.MONGO_URL).
       then(()=>console.log('DB Connection Successful'))
       .catch((err)=>{
           console.log(err);
       })

app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/todo',todoRoute);




app.listen(process.env.PORT || PORT,function(req,res){
    console.log('Server is running on Port:',PORT);
})