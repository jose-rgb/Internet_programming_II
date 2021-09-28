import express from 'express';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';

const server = express()

server.use(express.json())
server.use(cors())

server.get('/', async(req: Request, res: Response)=>{
    return res.status(200).json({"nome":"ola"})
})

server.listen(8080, ()=>{
    console.log('App running in http://localhost:8080/')
})
