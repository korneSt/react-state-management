import { IMovie } from "../../types";

export type MovieAction =
 | { type: 'SET_MOVIES_STARTED' }
 | { type: 'SET_MOVIES_SUCCESS', payload: IMovie[] }
 | { type: 'SET_MOVIES_ERROR', payload: string }
 | { type: 'LIKE', payload: string }
 | { type: 'DISLIKE', payload: string }
