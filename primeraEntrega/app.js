const express = require("express")
const { Router } = require("express")
const { urlencoded } = require("body-parser")
const app = express()
const admin = false

const products = []
const carts = [
    { id: 1, timeStamp: '10/1/2023 20:16:58', products: [{id: 75, desc:"asda"}, {id: 12, desc:"ete"}
] },
    { id: 27, timeStamp: '10/1/2023 20:16:58', products: [{id: 75, desc:"asda"}, {id: 12, desc:"ete"}] },
    { id: 14, timeStamp: '10/1/2023 20:16:58', products: ["dag", {ead: 12}] },
    { id: 35, timeStamp: '10/1/2023 20:16:58', products: ["22", "78", "86"] }
]

const getId = (arr) => {
    if (arr[arr.length - 1]){
        return arr[arr.length - 1].id + 1
    } else {
        return 1
    }
}

const productsRouter = Router()

app.use(express.json())
app.use("/api/productos", productsRouter)
app.use(urlencoded({ extended: true }))
productsRouter.use(urlencoded({ extended: true }))

app.listen(8080, ()=>{console.log("rdy")})

productsRouter.get("/:id", (req, res)=>{
    const num = req.params.id
    if (!carts.find((prod)=>prod.id == num)){
        res.json({error: "producto no encontrado"})
        return
    }
    res.json(carts.find((prod)=>prod.id == num))
})
productsRouter.post("/", (req, res)=>{
    if (admin){
        const productToAdd = req.body
        productToAdd.id = carts.length + 1
        carts.push(productToAdd)
        res.json(productToAdd)
    } else {
        res.status(403)
        res.send(`Error 403: ${req.method} "${req.path}" no autorizado`)
    }
})
productsRouter.put("/", (req, res)=>{
    if (admin){
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
        res.json({actualizado: products[index]})
    } else {
        res.status(403)
        res.send(`Error 403: ${req.method} "${req.path}" no autorizado`)
    }
})
productsRouter.delete("/:id", (req, res)=>{
    if (admin){
        const num = req.params.id
        if (!carts.find((prod)=>prod.id == num)){
            res.json({error: "producto no encontrado"})
            return
        }
        const index = carts.findIndex((prod)=>prod.id == num)
        const deletedProduct = carts[index]
        carts.splice(index, 1)
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
    const newCart = {id: getId(carts), timeStamp: new Date(time).toLocaleString(), products: cartProducts}
    carts.push(newCart)
    res.json({ cartID: newCart.id })
})
cartRouter.delete("/:id", (req, res)=>{
    const num = req.params.id
    if (!carts.find((cart)=>cart.id == num)){
        res.json({error: "carrito no encontrado"})
        return
    }
    const index = carts.findIndex((cart)=>cart.id == num)
    carts.splice(index, 1)
    res.send(`Carrito con id:${num} eliminado.`)
})
cartRouter.get("/:id/productos", (req, res)=>{
    const num = req.params.id
    const index = carts.findIndex((cart)=>cart.id == num)
    res.json(carts[index].products)
})
cartRouter.post("/:id/productos", (req, res)=>{
    const num = req.params.id
    const productToAdd = req.body
    const index = carts.findIndex((cart)=>cart.id == num)
    carts[index].products.push(productToAdd)
    res.send(`${productToAdd} añadido`)
})
cartRouter.delete("/:id/productos/:id_prod", (req, res)=>{
    const cartID = req.params.id
    const prodID = req.params.id_prod
    const cartIndex = carts.findIndex((cart)=>cart.id == cartID)
    const prodIndex = carts[cartIndex].products.findIndex((prod)=>prod.id == prodID)
    const eliminatedProduct = carts[cartIndex].products[prodIndex]
    console.log(carts)
    carts[cartIndex].products.splice(prodIndex, 1)
    res.json({eliminado: eliminatedProduct})
    console.log(carts)
})
