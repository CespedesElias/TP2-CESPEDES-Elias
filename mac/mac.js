const fs = require('fs')
/**
 * funcion para leer/escribir un archivo de forma asincronica con callbacks
 */
function readWriteFsASync() {

    try {
        fs.readFile('./package.json', 'utf-8', (error, datos) => {
            if(error) throw Error(`Error en lectura asincrónica: ${error.message}`)
            let info = {
                contenidoStr: JSON.stringify(datos, null, '\t'),
                contenidoObj: JSON.parse(datos),
                size:  fs.statSync('./package.json').size
            }
            console.log('Lectura del objeto info: ', info) 
            setTimeout(() => {
                fs.writeFile('./info.txt', JSON.stringify(info), error => {
                    if(error) throw Error(`Error en escritura asincrónica: ${error.message}`)
                    console.log('Escritura de archivo ok')
                })
            }, 1000)
        })
    }
    catch(error) {
        console.log(`Error en operación asincrónica de lectura / escritura: ${error.message}`)
    }
}
readWriteFsASync()