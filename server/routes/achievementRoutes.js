const express=require("express");
const Achievement=require("../models/Achievement");
const authMiddleware=
require("../middleware/authMiddleware");

const router=express.Router();

router.get("/me",
authMiddleware,
async(req,res)=>{

const data=
await Achievement.find({
  userId:req.userId
});

res.json(data);

});

module.exports=router;
