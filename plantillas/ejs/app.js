const express = require("express")
const app = express()
const { urlencoded } = require("body-parser")

const products = [
    {
        title: "Calculator",
        price: 280,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/business-1221/24/Calculator-256.png",
    },
    {
        title: "Phone",
        price: 190,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/apple-products-2026/512/iPhone_X_home-screen-256.png",
    },
    {
        title: "Laptop",
        price: 370,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/startup-17/32/startup-03-256.png",
    },
    {
        title: "Camera",
        price: 310,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/camera-alt-256.png",
    }
]

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"))
app.use(urlencoded({ extended: true }))

app.get("/productos", (_,res)=>{
    res.render("layout", {productos: products})
})
app.post("/productos", (req, res)=>{
    const productToAdd = req.body
    products.push(productToAdd)
    console.log(productToAdd)
    res.redirect("/")
})

app.listen(3000, ()=>console.log("listening"))