(async () => {
    const express = require('express')
    const app = express()
    const db = require("./db.js")
    const port = 3000
    
    app.set("view engine","ejs")
    
    app.use(express.static('livraria-2022'))
    app.use("/books",express.static("books"))
    app.use("/imgs",express.static("imgs"))
    app.use("/css",express.static("css"))
    app.use("/js",express.static("js"))
    
    const consulta = await db.selectFilmes()
    const consultaLivro = await db.selectLivros()
    console.log(consulta[0])
    console.log(consultaLivro[0])
    
    app.get("/",(req,res)=>{
        res.render(`index`,
            {titulo:"Conheça nossos livros",
            promo:"Todos os livros com 10% de desconto!",
            livro:consulta,
            galeria:consultaLivro
        })
    })
    
    app.listen(port,()=> console.log("Servidor rodando com nodemon!"))
    
    })
    ()