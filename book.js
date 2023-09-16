const express=require("express");
const router=express.Router();
const { PrismaClient } =require('@prisma/client')

const prisma = new PrismaClient()
//Get All Books
router.get("/",async(req,res)=>{
    try{
    const books=await prisma.book.findMany({
        where:{
            deletedAt:null
        }
    })
    res.json(books)
}catch(err) {
    res.status(500).json({
    message: err.message || "Something went wrong while creating new user."
  });
}

});
//Getting only one book by id
router.get("/:id",async(req,res)=>{
    try{
    const id=Number(req.params.id);
    const book= await prisma.book.findUnique({
        
        where:{
            id:id,
            deletedAt:null
        }
    })
    if(!book){
        res.status(404).json({ error: "No Book Found" })
        return;
    }
    res.json(book)
}
catch(err) {
    res.status(500).send({
    message: err.message || "Something went wrong while creating new user."
  });
}
})
//Put requet for creatin book record in list
router.post("/",async(req,res)=>{
    try{
    const book= await prisma.book.create({
        data:{
            name:req.body.name,
            author:req.body.author
        }
    })
    console.log("Book has been created");
    res.json(book);
}
catch(err) {
    res.status(500).send({
    message: err.message || "Something went wrong while creating new user."
  });
}
});
//Put Request for updating book record in list
router.put("/:id",async(req,res)=>{
    try{
    const book= await prisma.book.update({
        where:{
            id:Number(req.params.id)
        },
        data:{
            name:req.body.name,
            author:req.body.author
        }
    })
    console.log("Book has been updated");
    res.json(book);
}
catch(err) {
    res.status(500).json({
    message: err.message || "Something went wrong while creating new user."
  });
}
});
router.delete("/:id",async(req,res)=>{
    try{
     await prisma.book.update({
        where:{
            id:Number(req.params.id)
        },
        data:{
            deletedAt:new Date()
        }
    })
    console.log("Book has been Deleted");
    res.json({message:"Book has been deleted"}).status(201);
}
catch(err) {
    res.status(500).send({
    message:  "Book is already Deleted or Does not Exist"
  });
}
})

module.exports=router