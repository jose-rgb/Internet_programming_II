import { Movie } from "../../domain/entidades/Movie";

//operações
export interface MovieRepository{
    all(): Promise<Movie[]>
}