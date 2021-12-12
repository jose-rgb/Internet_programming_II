import { MovieRepository } from "../../../../application/repositories/MovieRepository";
import { Movie } from "../../../../domain/entidades/Movie";

export class FirestoreMovieRepository implements MovieRepository{
    public async all():  Promise<Movie[]>{
        //usar code firestore
        return []
    }
}