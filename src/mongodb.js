const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/Todolistdb")
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log("Mongodb Failed to connect");
    console.log(err); 
  });

const todoSchema=new mongoose.Schema({
    name:{
        type:String,
    }
});

const Item=mongoose.model("Item",todoSchema)
module.exports=Item;

