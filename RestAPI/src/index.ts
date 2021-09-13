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

//Routes (Filme: id, nome, tema, ano, duracao)
app.get('/filmes', async (req: Request, res: Response)=>{
   //conectando na coleção
   const filmesRef = db.collection('filmes')
   //referência
   const filmesDoc = await filmesRef.get()

   const filmes: any = []
   //extraindo data e colocando na lista
   filmesDoc.forEach((doc)=>{filmes.push(doc.data())})
   
   return res.status(200).json([filmes])
 })

 app.post('/filmes', (req: Request, res: Response)=>{
     //desestruturação
    const {id, nome, tema, ano, duracao} = req.body

    return res.status(201).json({id, nome, tema, ano, duracao})
 })

 app.get('/filmes/:id', (req: Request, res: Response)=>{

    const id = req.params.id
    
    const filme = { id, nome: 'lagoa azul', ano: 1999, duracao: 12 }

    return res.status(200).json([filme])
 })

 app.put('/filmes/:id', (req: Request, res: Response)=>{
   //pegar no db o obj de por id, atualizar e retornar 
    const id = req.params.id
    
    const filme = { id, nome: 'lagoa azul', ano: 1999, duracao: 12 }

    return res.status(200).json([filme])
 })

 app.delete('/filmes/:id', (req: Request, res: Response)=>{
   //ir no db e verificar se id existe
    const id = req.params.id

    return res.status(204).json({ola: "helooo"})
    
 })

//http://localhost:3000/
app.listen(3000, ()=>{
    console.log('App running....')
})