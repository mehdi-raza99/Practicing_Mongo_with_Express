const mongoose=require('mongoose');
const { Schema, model } = mongoose;


const qouteSchema=new Schema({
    uploader: {type: String,required: true},
    author: {type: String,required: true},
    qoute: {type: String,required: true}
  });

const qoute=model("qoute",qouteSchema);
module.exports=qoute