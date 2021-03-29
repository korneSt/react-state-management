
export interface Global {
  darkMode: boolean;
}

export interface IMovie {
  score: number;
  show: {
    id: string;
    name: string;
    status: string;
    rating: {
      average: number;
    };
    image: {
      medium: string;
      original: string;
    };
    summary: string;
  };
}

export interface LoadingData {
  isLoading: boolean;
  error: string;
}

export interface IMovies {
  movies: {
    data: IMovie[];
  } & LoadingData;
  likes: {
    [key: string]: number;
  };
  favourites: IMovie[];
}

export type MovieAction =
 | { type: 'SET_MOVIES_STARTED' }
 | { type: 'SET_MOVIES_SUCCESS', payload: IMovie[] }
 | { type: 'SET_MOVIES_ERROR', payload: string }
 | { type: 'LIKE', payload: string }
 | { type: 'DISLIKE', payload: string }
