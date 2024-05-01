const fs = require('fs');
/**
 * esta funcion recibe una ruta para leer un archivo 
 * @param {filePath} filePath ruta
 * @returns retorna una promesa con los datos leidos si es exitosa, sino un error
 */
function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  });
}
/**
 * esta funcion recibe una ruta de un archivo y los datos para escribir en dicho archivo
 * @param {*} filePath ruta
 * @param {*} data datos para escribir el archivo
 * @returns  si no es exitosa retorna un error, si se cumple escribe el archivo
 */
function writeFilePromise(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    });
  });
}
/**
 * esta funcion recibe un archivo para leer, construyte el objeto, lo muestra termina escribiendo la informacion leida en el archivo de salida
 * @param {*} inputFilePath archivo de entrada para leer
 * @param {*} outputFilePath archivo de salida para escribir
 * @returns 
 */
function readWriteFile(inputFilePath, outputFilePath) {
  return readFilePromise(inputFilePath)
    .then((data) => {
      let info = {
        contenidoStr: JSON.stringify(data, null, '\t'),
        contenidoObj: JSON.parse(data),
        size: fs.statSync('./package.json').size,
      };
      console.log('Lectura del objeto info: ',info)
      return setTimeout(() => {
        writeFilePromise(outputFilePath, JSON.stringify(info))
      }, 1000)
    })
    .catch((error) => {
      throw new Error(`Error al procesar archivo: ${error.message}`)
    });
}
/**
 * invocacion de la funcion pasandole el archivo de entreada para leer y el archivo de salida para escribir
 */
readWriteFile('./package.json', './info.txt')
  .then(() => {
    console.log('Escritura de archivo ok')
  })
  .catch((error) => {
    console.error("Error al modificar y escribir en el archivo:", error)
  });
