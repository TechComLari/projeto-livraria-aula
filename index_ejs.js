(async () => {
    const express = require('express')
    const app = express()
    const db = require("./db.js")
    const url = require("url")
    const port = 3000
    
    app.set("view engine","ejs")
    
    app.use(express.static('livraria-2022'))
    app.use("/books",express.static("books"))
    app.use("/imgs",express.static("imgs"))
    app.use("/css",express.static("css"))
    app.use("/js",express.static("js"))
    
    const consulta = await db.selectFilmes()
    const consultaLivro = await db.selectLivros()

    //console.log(consulta[0])
    //console.log(consultaLivro[0])
    
    app.get("/",(req,res)=>{
        res.render(`index`,
            {titulo:"Conheça nossos livros",
            promo:"Todos os livros com 10% de desconto!",
            livro:consulta,
            galeria:consultaLivro
        })
    })


    app.get("/upd-promo",(req,res)=>{
        res.render(`adm/atualiza-promocao`,
            {titulo:"Conheça nossos livros",
            promo:"Todos os livros com 10% de desconto!",
            livro:consulta,
            galeria:consultaLivro
        })
    })


    app.get("/insere-livro",async(req,res)=>{
        await db.insertLivro(
         {titulo:"Guerra dos Mundos",
         resumo:"Lorem Lorem",
         valor:10.40,
         imagem:"guerra-dos-mundos.jpg"})
        res.send("Livro adicionado!")
    })


    app.get("/atualiza-promo",async(req,res)=>{
        // let infoUrl = req.url
        // let urlProp = url.parse(infoUrl,true)
        // let q = urlProp.query
        let qs = url.parse(req.url,true).query
        await db.updatePromo(qs.promo,qs.id)//localhost:8080/atualiza-promo?promo=1&id=5
        res.send("<h2>Lista de promoções atualizada</h2><a href='./'>Voltar</a>")
    })


    app.get("/promocoes",async(req,res)=>{
        const consultaPromo = await db.selectPromo()
        res.render(`promocoes`),{
            titulo:"conheça nossos livros!!",
            promo:"Todos os livros com 50% de desconto",
            livro:consulta,
            galeria:consultaPromo
        }
    })
    

    app.get("/single-produto",async(req,res)=>{
        let infoUrl = req.url
        let urlProp = url.parse(infoUrl,true)
        let q = urlProp.query
        const consultaSingle = await db.selectSingle(q.id)
        const consultaInit = await db.selectSingle(4)
        res.render(`single-produto`,
            {titulo:"Conheça nossos livros",
            promo:"Todos os livros com 10% de desconto!",
            livro:consulta,
            galeria:consultaSingle,
            inicio:consultaInit
        })
    })

    
    app.get("/cadastro",async(req,res)=>{
        let infoUrl = req.url
        let urlProp = url.parse(infoUrl,true)
        let q = urlProp.query
       const consultaSingle = await db.selectSingle(q.id)
       const consultaInit = await db.selectSingle(4)
       res.render(`cadastro`,{
           titulo:"Conheça nossos livros",
           promo:"Todos os livros com 10% de desconto!",
           livro:consulta,
           galeria: consultaInit
       })
    })

    app.listen(port,()=> console.log("Servidor rodando com nodemon!"))
    
    })
()