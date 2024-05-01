const fs = require('fs')
/**
 * esta funcion recibe una ruta para leer un archivo 
 * @param {filePath} filePath ruta
 * @returns retorna una promesa con los datos leidos si es exitosa, sino un error
 */
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
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
      fs.writeFile(filePath, data, "utf8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
/**
 * esta funcion lee un archivo, construyte el objeto, lo muestra y termina escribiendo la informacion leida en el archivo de info.txt
 * 
 */
async function readWriteFile(){
    try {
        let readFile = await readFilePromise("./package.json")
        let info = {
            contenidoStr: JSON.stringify(readFile, null, "\t"),
            contenidoObj: JSON.parse(readFile),
            size: fs.statSync("./package.json").size,
          };
        console.log('Lectura de objeto info: ',info)
        let writeFile = await writeFilePromise("./info.txt", JSON.stringify(info));
        console.log('archivo escrito')
    } catch (error) {
        console.log('Error en lectura/escritura del archivo: ',error)
    }
}
readWriteFile()