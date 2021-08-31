import express from 'express';
import { Request, Response } from 'express';

const app = express()

app.use(express.json())

//Routes
app.get('/', (request: Request, response: Response)=>{
   
   return response.json( { mensagem: 'hello World!' })
})

//http://localhost:3000/
app.listen(3000, ()=>{
    console.log('App running....')
})