
export interface Movie {
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

export interface MoviesState {
  movies: {
    data: Movie[];
  } & LoadingData;
  likes: {
    [key: string]: number;
  };
  favourites: Movie[];
}