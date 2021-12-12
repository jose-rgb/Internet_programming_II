import express from 'express';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';
import { MovieController } from './presentation/controllers/MovieController';

const app = express()

app.use(express.json())
app.use(cors())

//Inicializando o Firebase
var serviceAccount = require("./credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db =admin.firestore()

//Routes (Filme: id, nome, genero, ano, duracao)

const movieController = new MovieController()

//listar todos
app.get('/filmes', movieController.save)

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
 app.put('/filmes/:id', async(req: Request, res: Response)=>{
   //pegar no db o obj de por id, atualizar e retornar 
    const id = req.params.id
    
    
    const filme = await db.collection('filmes').doc(id).get()

    //const filmePut = await filme.update({nome: true});

    return res.status(200).json({id: filme.id, ...filme.data()})
 })


 //deletar filme
 app.delete('/filmes/:id',async(req: Request, res: Response)=>{
    const id = req.params.id

    const filmeRef = await db.collection('filmes').doc(id).delete();

    return res.status(204)
    
 })

app.listen(3000, ()=>{
    console.log('App running in http://localhost:3000/')
})