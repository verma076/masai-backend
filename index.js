const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {bookRouter}=require("./routes/book.routes")


const app=express()

app.use(express.json())



app.get("/",(req,res)=>{
    res.status(200).send({"msg":"This is the Home page"})
})

app.use("/users",userRouter)

app.use("/book",bookRouter)




app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to the mongoDb")
        console.log("server is running at the port 8080")
    } catch (error) {
        console.log(error)
    }
  
})
