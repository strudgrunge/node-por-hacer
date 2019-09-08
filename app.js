//const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;
console.log(argv);
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');
let comando = argv._[0]; //En esta posicion del arreglo de yargs esta el comando

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea); //Devuelve un objeto 
        break;
    case 'listar':

        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('======Por Hacer======'.green);
            console.log(tarea.descripcion); //Esto viene del yargs.js
            console.log('Estado: ', tarea.completado); //Esto viene del yargs.js
            console.log('======================'.green);
        }
        break;
    case 'actualizar':

        let actualizado = porHacer.actualizar(argv.descripcion, argv.comando);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);

        break;

    default:
        console.log('Comando no es reconicido')


}