const express = require('express')
const app=express();
const path=require('path')
const methodOverride = require('method-override')
const port=3000;
const mongoose=require('mongoose');
const qoute=require('./models/qoute');
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

main().then(() => {
    console.log('Connection Established!')
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/qoutes');
}

let qoute1=new qoute({
    uploader: "Mehdi",
    author: "Muhammad Ali Jinnah",
    qoute: "Faliure is a word unknown to me!"
})
// qoute1.save().then((res) => {console.log(res);})

let  qoutes=[
    {
        "uploader": "John Doe",
        "author": "Albert Einstein",
        "quote": "Imagination is more important than knowledge."
    },
    {
        "uploader": "Sara Lee",
        "author": "Mahatma Gandhi",
        "quote": "Be the change that you wish to see in the world."
    },
    {
        "uploader": "Alex Smith",
        "author": "Winston Churchill",
        "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts."
    },
    {
        "uploader": "Emily Clark",
        "author": "Martin Luther King Jr.",
        "quote": "I have a dream that one day this nation will rise up and live out the true meaning of its creed."
    },
    {
        "uploader": "James Bond",
        "author": "Nelson Mandela",
        "quote": "It always seems impossible until it’s done."
    }
]


app.get('/qoute/new',(req,res) => {
    res.render("new")
})
app.post('/qoute',(req,res) => {
    let {uploader,author,qoute:qoutation}=req.body;
    let newQoute=new qoute({
        uploader: uploader,
        author: author,
        qoute: qoutation
    })
    newQoute.save().then((res) => {console.log(res);
    })
    res.redirect("/qoute")
})
app.get('/qoute/:id/edit',async (req,res) => {
    let {id}=req.params;
    let requestedQoute=await qoute.findById(id);
    res.render("edit",{requestedQoute})
})
app.patch('/qoute/:id',async (req,res) => {
    let {id}=req.params;
    let {uploader,author,qoute: qoutation}=req.body;
    let updatedQoute=await qoute.findByIdAndUpdate(id,{uploader: uploader,author: author,qoute: qoutation},{runValidators: true,new: true})
    console.log(updatedQoute);
    
    res.redirect("/qoute")
})

app.delete('/qoute/:id',(req,res) => {
    let {id}=req.params;
    qoute.findByIdAndDelete(id).then((res) => {
        console.log(res);
        
    })
    res.redirect("/qoute")
})
app.get('/qoute',async (req,res) => {
    let qoutes=await qoute.find();
    res.render("qoutes",{qoutes})
})

app.get('/',(req,res) => {
    res.send("<h1>Working and start asap!</h1>")
})

app.listen(port,() =>{
    console.log("Server Started");
})
