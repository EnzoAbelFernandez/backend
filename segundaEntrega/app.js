/*class Productos {
    constructor(nombre){
        fs.writeFileSync(`./${nombre}.txt`, "[]", ()=>{console.log("listo")})
        path = `./${nombre}.txt`
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
        doc = JSON.parse(doc)
        return doc
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
} */

const mongoose = require('mongoose')

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test')
}