async function conecta(){
    const mysql = require("mysql2/promise")
    const conn = await mysql.createConnection({
        host:"localhost",
        user:"lari",
        password:"312406La@.",
        database:"filmes"
    })
    console.log("mySQL conectado!")
    global.connection = conn
    return connection
}

//conecta()

async function selectFilmes(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM videos")
    //console.log(rows)
    return rows
}

async function selectLivros(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM livros ORDER BY livros_id ASC")
    //console.log(rows)
    return rows
}

async function selectSingle(id){
    const conectado = await conecta()
    const values = [id]
    const [rows] = await conectado.query("SELECT * FROM livros WHERE livros_id=?", values)
    //console.log(rows)
    return rows
}

async function insertLivro (livro){
    const conectado = await conecta()
    const values = [livro.titulo,livro.resumo,livro.valor,livro.imagem]
    const [rows] = await conectado.query("INSERT INTO livros(titulo,resumo,valor,imagem) VALUES (?,?,?,?)",values)
    console.log('Insert OK!')
    return rows
}

async function selectPromo (id){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT * FROM livros WHERE promo=1")
    return rows
}

async function updatePromo (promo,id){
    const conectado = await conecta()
    const values = [promo,id]
    return await conectado.query("UPDATE livros SET promo=? WHERE livros_id=?",values)
}

//updatePromo(0,3)
//selectFilmes()
//selectLivros()
//selectSingle(3)
//insetrLivro({titulo:'Wild Fury',resumo:'Lorem Lorem',valor:50.65, imagem:'wild-fury.jpg'})

module.exports = {
    selectFilmes,
    selectLivros,
    selectSingle,
    insertLivro,
    updatePromo}