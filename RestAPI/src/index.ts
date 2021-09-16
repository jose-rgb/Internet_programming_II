import express from 'express';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const app = express()

app.use(express.json())

//Inicializando o Firebase
var serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db =admin.firestore()

//Routes (Filme: id, nome, genero, ano, duracao)

//listar todos
app.get('/filmes', async (req: Request, res: Response)=>{
   //conectando na coleção
   const filmesRef = db.collection('filmes')
   //referência
   const filmesDoc = await filmesRef.get()

   const filmes: any = []
   //extraindo data e colocando na lista
   filmesDoc.forEach(doc=>filmes.push({id: doc.id, ...doc.data()}))
   
   return res.status(200).json([filmes])
 })

//criar filme
 app.post('/filmes', async(req: Request, res: Response)=>{
     //desestruturação
    const { nome, genero, ano, duracao} = req.body
    const filme = { nome, genero, ano, duracao}
    //salvando no firebase
    const resultado = await db.collection('filmes').add(filme)
    return res.status(201).json({id: resultado.id, ...filme})
 })


//obter 1 filme
 app.get('/filmes/:id', async(req: Request, res: Response)=>{

    const id = req.params.id
    
    const filme = await db.collection('filmes').doc(id).get()

    return res.status(200).json({id: filme.id, ...filme.data()})
 })


//atualizar filme
 app.put('/filmes/:id', (req: Request, res: Response)=>{
   //pegar no db o obj de por id, atualizar e retornar 
    const id = req.params.id
    
    const filme = { id, nome: 'lagoa azul', ano: 1999, duracao: 12 }

    return res.status(200).json([filme])
 })


 //deletar filme
 app.delete('/filmes/:id', (req: Request, res: Response)=>{
   //ir no db e verificar se id existe
    const id = req.params.id

    return res.status(204).json({ola: "helooo"})
    
 })

//http://localhost:3000/
app.listen(3000, ()=>{
    console.log('App running....')
})