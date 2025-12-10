const bodyParser = require("body-parser");
const express=require("express")
const app=express()
const Item=require("./mongodb")

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))//only then express can read what we entered

app.get("/",async(req,res)=>{
    try {
        const items = await Item.find()  // array of items = [{_id, name}, ...] from the database
        return res.render("list", { newListItem: items });
      } 
      catch (err) {
        console.error(err);
        return res.send("Error loading items");
      }
})

app.post("/",async (req,res)=>{
try{
   const newitem=new Item({
        name:req.body.new
   })
   await newitem.save()
   return res.redirect("/")
}
catch(err){
    console.log(err);
    return res.send("Error Saving item")
}

})

app.post("/delete",async(req,res)=>{
   try{
        await Item.findByIdAndDelete(req.body.checkbox);
        return res.redirect("/");
   }
   catch(err){
    console.log(err);
    return res.send("Error in deleting items")
   }
})

app.post("/reset", async (req, res) => {
    try {
      await Item.deleteMany({});   // deletes ALL items in the collection
      console.log("All items deleted");
      return res.redirect("/");
    } catch (err) {
      console.log(err);
      return res.send("Error clearing items");
    }
  });
  
app.listen(3000,()=>{
    console.log("Port connected");
})

//Express cannot understand html.
//Hence we must use a template engine.Here we use ejs.
// Ejs must have header and body separately in two files