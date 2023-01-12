const express = require("express")
const { Router } = require("express")
const { urlencoded } = require("body-parser")
const app = express()
const fs = require("fs")

const admin = true

const products = JSON.parse(fs.readFileSync("./products.txt"))

const getId = (arr) => {
    if (arr[arr.length - 1]){
        return arr[arr.length - 1].id + 1
    } else {
        return 1
    }
}
const write = (path, file, replace) => {
    const content = JSON.parse(fs.readFileSync(path))
    if (replace) {
        fs.writeFileSync(path, JSON.stringify(file, null, 2))
        return
    }
    content.push(file)
    fs.writeFileSync(path, JSON.stringify(content, null, 2))
}
const read = (path) => {
    return JSON.parse(fs.readFileSync(path))
}

const productsRouter = Router()

app.use(express.json())
app.use("/api/productos", productsRouter)
app.use(urlencoded({ extended: true }))
productsRouter.use(urlencoded({ extended: true }))

app.listen(8080, ()=>{console.log("rdy")})

productsRouter.get("/:id", (req, res)=>{
    const num = req.params.id
    const products = read("./products.txt")
    if (!products.find((prod)=>prod.id == num)){
        res.status(404)
        res.json({error: "producto no encontrado"})
        return
    }
    res.json(products.find((prod)=>prod.id == num))
})
productsRouter.post("/", (req, res)=>{
    if (admin){
        const productToAdd = req.body
        productToAdd.id = read("./products.txt").length + 1
        write("./products.txt", productToAdd)
        res.json(productToAdd)
    } else {
        res.status(403)
        res.send(`Error 403: ${req.method} "${req.path}" no autorizado`)
    }
})
productsRouter.put("/:id", (req, res)=>{
    if (admin){
        const productUpdate = req.body
        const num = req.params.id
        const products = read("./products.txt")
        if (!products.find((prod)=>prod.id == num)){
            res.status(404)
            res.json({error: "producto no encontrado"})
            return
        }
        const index = products.findIndex((prod)=>prod.id == num)
        if (productUpdate.price) products[index].price = productUpdate.price
        if (productUpdate.title) products[index].title = productUpdate.title
        if (productUpdate.thumbnail) products[index].thumbnail = productUpdate.thumbnail
        const updated = products[index]
        write("./products.txt", products, true)
        res.json({actualizado: updated})
    } else {
        res.status(403)
        res.send(`Error 403: ${req.method} "${req.path}" no autorizado`)
    }
})
productsRouter.delete("/:id", (req, res)=>{
    if (admin){
        const num = req.params.id
        const products = read("./products.txt")
        if (!products.find((prod)=>prod.id == num)){
            res.json({error: "producto no encontrado"})
            return
        }
        const index = products.findIndex((prod)=>prod.id == num)
        const deletedProduct = products[index]
        products.splice(index, 1)
        write("./products.txt", products, true)
        res.json({deleted: deletedProduct})
    } else {
        res.status(403)
        res.send(`Error 403: ${req.method} "${req.path}" no autorizado`)
    }
})

const cartRouter = Router()
app.use("/api/carrito", cartRouter)

cartRouter.get("/", (_, res)=>{
    res.json({hola: "hola"})
})
cartRouter.post("/", (req, res)=>{
    const time = Date.now()
    const cartProducts = req.body
    const newCart = {id: getId(products), timeStamp: new Date(time).toLocaleString(), products: cartProducts}
    products.push(newCart)
    res.json({ cartID: newCart.id })
})
cartRouter.delete("/:id", (req, res)=>{
    const num = req.params.id
    if (!products.find((cart)=>cart.id == num)){
        res.json({error: "carrito no encontrado"})
        return
    }
    const index = products.findIndex((cart)=>cart.id == num)
    products.splice(index, 1)
    res.send(`Carrito con id:${num} eliminado.`)
})
cartRouter.get("/:id/productos", (req, res)=>{
    const num = req.params.id
    const index = products.findIndex((cart)=>cart.id == num)
    res.json(products[index].products)
})
cartRouter.post("/:id/productos", (req, res)=>{
    const num = req.params.id
    const productToAdd = req.body
    const index = products.findIndex((cart)=>cart.id == num)
    products[index].products.push(productToAdd)
    res.send(`${productToAdd} añadido`)
})
cartRouter.delete("/:id/productos/:id_prod", (req, res)=>{
    const cartID = req.params.id
    const prodID = req.params.id_prod
    const cartIndex = products.findIndex((cart)=>cart.id == cartID)
    const prodIndex = products[cartIndex].products.findIndex((prod)=>prod.id == prodID)
    const eliminatedProduct = products[cartIndex].products[prodIndex]
    console.log(products)
    products[cartIndex].products.splice(prodIndex, 1)
    res.json({eliminado: eliminatedProduct})
    console.log(products)
})
