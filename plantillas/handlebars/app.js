const { urlencoded } = require("body-parser")
const { engine } = require("express-handlebars")
const express = require("express")
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

const app = express()
const PORT = 8080

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")
app.use(express.static("public"))
app.use(urlencoded({ extended: true }))

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
app.get("/", (_, res)=>{
    res.render("index.html")
})
app.get("/productos", (_, res)=>{
    res.render("prods", {productos: products})
})
app.post("/productos", (req, res)=>{
    const productToAdd = req.body
    products.push(productToAdd)
    console.log(productToAdd)
    res.redirect("/")
})