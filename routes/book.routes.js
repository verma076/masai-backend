const express=require("express");
const {BookModel}=require("../model/book.model")

const {auth }=require("../middleware/auth.middleware")

const bookRouter=express.Router()
bookRouter.use(auth)


bookRouter.get("/books", async (req, res) => {
    try {
        const { category, author } = req.query;

        const query = {};

        if (category) {
            query.category = category
        }
        if (author) {
            query.author = author;
        }
        const books = await BookModel.find(query);
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send({ "message": "Failed to fetch Books" })
    }
})
bookRouter.get("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const book = await BookModel.findById(id);
        if (!book) {
            return res.status(404).send({ "message": "Book Not Found" })
        }
        res.status(200).send(book);
    } catch (err) {
        res.status(500).send({ message: "Failed to fetch Books" })
    }
})


bookRouter.post("/books",auth,async(req,res)=>{
    const {title,author,category,price,quantity}=req.body
    try {
        const book=new BookModel({title,author,category,price,quantity})
        await book.save()
        res.status(201).send({"msg":"Book added in the list"})
    } catch (error) {
        res.status(400).send({"error":error})
    }
})
bookRouter.patch("/books/:id", async (req, res) => {
    const { id } = req.params;
    const { title, author, category, price, quantity } = req.body;

    try {
        const book = await BookModel.findByIdAndUpdate(id, { title, author, category, price, quantity });

        if (!book) {
            return res.status(404).send({ "message": "Book Not Found" });
        }

        res.status(201).send({ "message": "Book Updated Successfully" });
    } catch (err) {
        res.status(500).send({ "message": "Failed to update book" });
    }
})
bookRouter.delete("/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const book = await BookModel.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).send({ "message": "Book Not Found" });
        }
        res.status(201).send({ "message": "Book Deleted Successfully from the list" });
    } catch (err) {
        res.status(500).send({ "message": "Failed to delete book from the list" });
    }
})
module.exports={
    bookRouter
}