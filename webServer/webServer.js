const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 8080
app.get("/", ((_, res)=>{
    res.send("<h1>Hola</h1>")
}))
const server = app.listen(PORT, ()=>console.log(`server online in port ${PORT}`))
let path
const productos = [
    {name: "af1", price: 482, thumbnail: "foto1", id: 1},
    {name: "yeezy", price: 782, thumbnail: "foto2", id: 2},
    {name: "nizza", price: 275, thumbnail: "foto3", id: 3} 
]

class Productos {
    constructor(){  
        let doc = fs.readFileSync(`./zapas.txt`, "utf-8", ()=>{console.log("ok")})
    }
    save(producto){
        let doc = fs.readFileSync(`./zapas.txt`, "utf-8", ()=>{console.log("ok")})       
        producto.id = (JSON.parse(doc).length) + 1
        let id = producto.id
        doc = JSON.parse(doc)
        doc.push(producto)
        fs.writeFileSync("./zapas.txt", JSON.stringify(doc), ()=>id)
    }
    getById(id){
        let doc = fs.readFileSync(`./zapas.txt`, "utf-8", ()=>{console.log("ok")})
        doc = JSON.parse(doc)
        let producto = doc.find(prod=>prod.id === id)
        return producto
    }
    getAll(){
        let doc = fs.readFileSync(`./zapas.txt`, "utf-8", ()=>{console.log("ok")})
        let docPar = JSON.parse(doc)
        return docPar
    }
    deleteById(id){
        let doc = fs.readFileSync(`./zapas.txt`, "utf-8", ()=>{console.log("ok")})
        doc = JSON.parse(doc)
        let producto = doc.find(prod=>prod.id === id)
        doc.splice(producto.id-1, 1)
        fs.writeFileSync("./zapas.txt", JSON.stringify(doc), ()=>{console.log("borrado");})
    }
    deleteAll(){
        fs.writeFileSync(`./zapas.txt`, "[]", ()=>{console.log("listo")})
    }
    random(){
        let doc = fs.readFileSync(`./zapas.txt`, "utf-8", ()=>{console.log("ok")})
        let docPar = JSON.parse(doc)
        let num = Math.round(Math.random() *( docPar.length - 1))
        return docPar[num]
    }
}

const zapas = new Productos()

app.get("/productos", ((_, res)=>{
    res.send(`<p>${JSON.stringify(zapas.getAll())}</p>`)
}))
app.get("/productoRandom", ((_, res)=>{
    res.send(`<p>${JSON.stringify(zapas.random())}</p>`)
}))
