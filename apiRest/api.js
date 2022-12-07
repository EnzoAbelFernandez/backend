const { urlencoded } = require("body-parser")
const { Router } = require("express")
const express = require("express")
const products = [
    {
        title: "Nike AF1",
        price: 280,
        thumbnail: "photo1",
        id: 1
    },
    {
        title: "Converse Taylor",
        price: 190,
        thumbnail: "photo2",
        id: 2
    },
    {
        title: "Jordan 1 Chicago",
        price: 370,
        thumbnail: "photo3",
        id: 3
    },
    {
        title: "Adidas Yeezy 350 v2",
        price: 310,
        thumbnail: "photo4",
        id: 4
    }
]

const app = express()
const PORT = 8080
const productsRouter = Router()

app.use(express.static("public"))
app.use(express.json())
app.use("/api/productos", productsRouter)
app.use(urlencoded({ extended: true }))
productsRouter.use(urlencoded({ extended: true }))

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
app.get("/", (_, res)=>{
    res.render("index.html")
})

productsRouter.get("/", (_, res)=>{
    res.json(products)
})
productsRouter.get("/:id", (req, res)=>{
    const num = req.params.id
    if (!products.find((prod)=>prod.id == num)){
        res.json({error: "producto no encontrado"})
        return
    }
    res.json(products.find((prod)=>prod.id == num))
})
productsRouter.post("/", (req, res)=>{
    const productToAdd = req.body
    productToAdd.id = products.length + 1
    products.push(productToAdd)
    res.json(productToAdd)
})
productsRouter.put("/:id", (req, res)=>{
    const productUpdate = req.body
    const num = req.params.id
    if (!products.find((prod)=>prod.id == num)){
        res.json({error: "producto no encontrado"})
        return
    }
    const index = products.findIndex((prod)=>prod.id == num)
    products[index].price = productUpdate.price
    products[index].title = productUpdate.title
    products[index].thumbnail = productUpdate.thumbnail
    res.json(products[index])
})
productsRouter.delete("/:id", (req, res)=>{
    const num = req.params.id
    if (!products.find((prod)=>prod.id == num)){
        res.json({error: "producto no encontrado"})
        return
    }
    const index = products.findIndex((prod)=>prod.id == num)
    const deletedProduct = products[index]
    products.splice(index, 1)
    res.json({deleted: deletedProduct})
})