import express from 'express'
const app = express();

app.use(express.json())
const port = 8080;
const ProductManager = require('ProductManager');
const productsFilePath = 'products.json'; 
/* const prods = [
    {id: 1, nombre: "Papas fritas", categoria: 'Snacks', code: 'S1' },
    { id: 2, nombre: "Lentejas", categoria: 'Legumbres', code: 'L1' },
    { id: 3, nombre: "Nachos", categoria: 'Snacks', code: 'S2' }
] */

app.get('/',(req,res) => {
    res.send('Hola mundo')
})


app.get('/products',(req,res)=>{
    console.log(req.query)
    const {categoria} = req.query
    if (categoria){
        const products = productsFilePath.filter(prod => prod.categoria === categoria)
        res.status(200).send(products)
    }
    res.status(200).send(productsFilePath )
})

app.get('/products/:id', (req,res)=>{
    const prod = productsFilePath.find(prod => prod.id === parseInt(req.params.id))

    if (prod) {
        res.status(200).send(prod)
    } else {
        res.status(400).send ('Producto no existente')
    }
})

app.post('/products', (req,res) =>{
    console.log(req.body)
    const producto = productsFilePath.find(prod => prod.code === req.body.code)
    if (producto) {
        res.status(400).send("Producto ya existente")
    }else{
        productsFilePath.push(req.body)
        res.status(200).send("Producto Creado")
    }
    
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})




/* 
    request = peticion
    response = respuestas
    npm init --yes
    npm i nodemon -D
*/
/*
echo "# Desafio3-TelloParra" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/NahuelTello/Desafio3-TelloParra.git
git push -u origin main 
 */