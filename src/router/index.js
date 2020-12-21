const fs = require('fs');
const path = require('path')

// const useRoutes = (app) => {  
//   fs.readdirSync(__dirname).forEach(file => {
//     if(file === 'index.js') return;
//     const router = require(`./${file}`)
//     console.log(router)
//     app.use(router.routes())
//     app.use(router.allowedMethods())

//   })
// }

function useRoutes () {  
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return;
    const router = require(`./${file}`)
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}


module.exports = useRoutes