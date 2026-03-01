const mongoose=require("mongoose");

const matchSchema=new mongoose.Schema({
player1:String,
player2:String,
winner:String,
score1:Number,
score2:Number
},{timestamps:true});

module.exports=
mongoose.model("Match",matchSchema);