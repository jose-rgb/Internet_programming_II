import { Request, Response } from "express";
import { GetAllMoviesQuery } from "../../application/query/GetAllMoviesQuery";
import { FirestoreMovieRepository } from "../../infrastructure/persistenceDB/firestore/respositories/FirestoreMovieRepository";

export class MovieController{

    public async save(req:  Request,  res: Response){
        //obter command/queries
        const repoMovie = new  FirestoreMovieRepository()
        const query = new GetAllMoviesQuery(repoMovie)

        const movies = await query.execute()

        return res.json(movies)
    }

}