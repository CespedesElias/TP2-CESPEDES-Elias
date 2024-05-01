const fs = require('fs')
/**
 * funcion para leer/escribir archivo de forma sincronica
 */
function readWriteFsSync() {

    try {
        let datos = fs.readFileSync('./package.json', 'utf-8')
        let info = {
            contenidoStr: JSON.stringify(datos, null, '\t'),
            contenidoObj: JSON.parse(datos),
            size:  fs.statSync('./package.json').size
        }
        console.log('Lectura del objeto info: ', info)

        fs.writeFileSync('./info.txt', JSON.stringify(info))
        console.log('escritura de archivo ok')
    }
    catch(error) {
        console.log(`Error en operación sincrónica de lectura / escritura: ${error.message}`)
    }
}
readWriteFsSync()