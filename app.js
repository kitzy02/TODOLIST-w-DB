const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema = new mongoose.Schema({
    name: String
});
const item = mongoose.model("task", trySchema);
const todo = new item({
    name: "Create some videos"
});
const todo2 = new item({
    name: "Learn DSA"
});
const todo3 = new item({
    name: "Learn React"
});
const todo4 = new item({
    name: "Take some rest"
});
// todo.save();
// todo2.save();
// todo3.save();
// todo4.save();

app.get("/", function(req, res) {
    item.find({}).then(foundItems => {
        res.render("list", { deyej: foundItems });
    }).catch(err => {
        console.log(err);
    });
});
app.post('/', (req, res) => {
    const itemName=req.body.ele1;
    const todo5=new item({
        name:itemName
    });
    todo5.save();
    res.redirect("/");
    
});
app.post('/delete', (req, res) => {
    const checked = req.body.checkbox1;
    item.findByIdAndDelete(checked)
     .then(() => {
        console.log("deleted");
        res.redirect("/");
      })
     .catch((err) => {
        console.log(err);
      });
  });

app.listen(800, function() {
    console.log("Server is running");
});
