class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombreLibro, autorLibro){
        this.libros.push({nombre: nombreLibro, autor: autorLibro})
    }
    getBookNames(){
        let nombresLibros = []
        for (let libro of this.libros) {
            nombresLibros.push(libro.nombre)
        }
        return nombresLibros;
    }
}

const asd = [
    {name: "af1", price: 482, thumbnail: "foto1", id: 1},
    {name: "yeezy", price: 782, thumbnail: "foto2", id: 2},
    {name: "nizza", price: 275, thumbnail: "foto3", id: 3} 
]

let asdPar = JSON.stringify(asd)
console.log(asdPar);
