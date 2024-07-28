const express=require("express");
const bodyParser=require("body-parser");

var app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema=new mongoose.Schema({
    name:String
});
const item=mongoose.model("task",trySchema);
const todo=new item({
    name:"Create some videos"
});
const todo2=new item({
    name:"Learn DSA"
});
const todo3=new item({
    name:"Learn React"
});
const todo4=new item({
    name:"Take some rest"
});
// todo2.save();
// todo3.save();
// todo4.save();



app.get("/",function(req,res){
    item.find({},function(err,foundItems){
        if(err){
            console.log(err);
        }else{
            res.render("list",{deyej: foundItems});
        }
    });
});

app.listen(8000,function(){
    console.log("Server is running");
});
