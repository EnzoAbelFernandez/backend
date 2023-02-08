const mongoose = require('mongoose')
const {model, Schema} = mongoose

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

main().catch(err => console.log(err))

const productsSchema = new Schema(
    {title: String, price: Number}, {timestamps: true}
)

class Products{
    constructor(name){
        const Product = mongoose.model('product', productsSchema)
    }
    save(title, price){
        const p = new Product({title, price})
    }
    getById(id){
        Product.find({id}).then(res => res)
    }
    deleteById(id){
        Product.deleteOne({id})
    }
    deleteAll(){
        Product.delete({})
    }
}