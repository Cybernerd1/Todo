const express = require('express');
const Todo = require("../models/Todo.js");

const router = express.Router();

// Get all todos for loggedin user
router.get("/",async(req,res)=>{
    const todos = await Todo.find({user:req.userId}).sort({createdAt:-1});
    res.json(todos)
})

router.post("/", async(req,res)=>{
    const {text} =req.body;
    if(!text?.trim()){
        return res.status(400).json({message:"Text required"});

    }
    const todo=await Todo.create({
        user:req.userId,
        text,
        completed:false,
    });
    res.json(todo)
})

// edit todo
router.put("/:id", async(req,res)=>{
    const {text}=req.body;
    const todo=await Todo.findOneAndUpdate(
        {_id: req.params.id},
        {text},
        {new:true}
    );
    res.json(todo);
});

router.patch("/:id/toggle",async (req,res)=>{
    const todo = await Todo.findOne({_id:req.params.id, user:req.userId});
    if(!todo ) return res.status(404).json({message:"Not found"});

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

router.delete("/:id", async (req,res)=>{
    await Todo.findOneAndDelete({_id:req.params.id, user:req.userId});
    res.json({success:true});
});

module.exports = router