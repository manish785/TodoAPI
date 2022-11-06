const express = require("express");
const router = express.Router();
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const Todo = require("../models/Todo");
const User = require("../models/User");




router.post('/create-todo', verifyToken, async(req, res) => {
	const todoTask = new Todo({
		   title: req.body.title
		});
		try {
		   await todoTask.save();
		   return res.json("data inserted successfully");
		} catch (err) {
		   return res.json("Error while inserting the data");
		}
});


router.patch('/update-todo/:id', verifyToken ,async (req,res)=>{

    try{
       const updateTodoList=await Todo.updateOne();
       res.status(200).json(updateTodoList);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/', verifyToken, async(req,res)=>{
    try{
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
        const page = req.query.page ? parseInt(req.query.page) : 0;
        const data= await Todo.find({}).limit(pageSize).skip(pageSize * page);
        return res.status(200).json(data);
    }catch(err){
        console.log(err);
    }
})

router.get('/:id', verifyToken, async(req,res)=>{
    try{
        const data=await Todo.find();
        return res.status(200).json(data);
    }catch(err){
        console.log(err);
    }
})

router.delete('/delete/todo/:id', verifyToken , async(req,res)=>{
    try{
        const data=await Todo.deleteOne();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
});




module.exports=router;