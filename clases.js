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

let enzo = new Usuario("Enzo", "Fernández", [{nombre: "Harry Potter", autor: "J.K. Rowling"}], ["Eros", "Mara", "Fito"])
console.log(enzo.getFullName())
enzo.addBook("asdasd", "ajajaja")
console.log(enzo.getBookNames())
console.log(enzo.countMascotas())
enzo.addMascota("Iris")
console.log(enzo.countMascotas())
