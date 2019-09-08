const fs = require('fs'); //Requerimos el file sistem para guardar en algun lugar fisico
//Para que la informacion sea persistente
//se guardara en un JSON
let listadoPorHacer = [];
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); //Aca se transforma listadoPorHAcer en un JSON

    const dato = new Uint8Array(Buffer.from('Hello Node.js')); //Modulo de node, para imprimir archivos 
    fs.writeFile('Data-base/data.JSON', data, (err) => {
        if (err)
            throw new Error('No se pudo grabar', err);

    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../Data-base/data.json');

    } catch (error) {
        listadoPorHacer = []; //Si falla al cargar
        //es un listado vacio, de manera que cuando
        //se llame a guardarDB siempre va a haber un 
        //arreglo vacio 
    }


}
const crear = (descripcion) => {
    cargarDB();

    let poHacer = {
        descripcion,
        completado: false
    };


    listadoPorHacer.push(poHacer);

    guardarDB();

    return poHacer;
}

const getListado = () => {
    cargarDB(); //Primero carga esto y luego obtiene la lista
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB(); //Buscamos en el arreglo de listado por hacer
    //lo que coincida con la descripcion que el usuario esta
    //enviando, es decir actualizar esa tarea que coincida con el 
    //parametro descripcion de esta const.
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //Aca le digo a JS que me de la posicion de tarea (index) si la descripcion
    //de la tarea coincide, si no me regresa un -1
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();
    let index = listadoPorHacer.findIndex(tarea =>
        tarea.descripcion === descripcion)
    if (index >= 0) {
        listadoPorHacer.splice(index, 1)
        guardarDB()
        return true
    } else {
        return false
    }

    /*let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    }); //la tarea que estoy recibiendo es diferente a las que tengo entonces la excluyo con finter
    //Filter es una funcion de los arreglos que 
    //me permite quitar o filtrar algun elemento
    //en particular
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;

    } else {
        listadoPorHacer = nuevoListado;
        guardarDB;
        return true;
        Este no funciono
    }*/

}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}