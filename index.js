const fs = require('fs')

// fs.cp('./templates', './test', { force: true, recursive: true }, (error) => {
//   console.log('S', error)
// })

fs.readdirSync('./templates/Controller').forEach((file) => {
  const [fileName, extension] = file.split('.')
  console.log(fileName)
  fs.copyFileSync(
    `./templates/Controller/${fileName}.${extension}`,
    `./test/Controller/${fileName}.ts`
  )
})

// fs.readdir('./templates/Controller', function (err, files) {
//   //handling error
//   if (err) {
//     return console.log('Unable to scan directory: ' + err)
//   }
//   //listing all files using forEach
//   files.forEach(function (file) {
//     // Do whatever you want to do with the file
//     console.log(file)
//     const [fileName, extension] = file.split('.')
//     console.log(fileName, { extension })
//     // fs.copyFileSync(
//     //   `./templates/Controller/${fileName}.${extension}`,
//     //   `./test/Controller/${fileName}.ts`
//     // )
//   })
// })
