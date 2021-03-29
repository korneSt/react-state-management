/*
* Global
*/

export interface IGlobal {
  darkMode: boolean;
}

export const initialGlobalState: IGlobal = {
  darkMode: false,
};


/*
* Movies
*/

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

export interface ILoadingData {
  isLoading: boolean;
  error: string;
}

export interface IMovies {
  movies: {
    data: IMovie[];
  } & ILoadingData;
  likes: {
    [key: string]: number; //key: name, value: number of likes
  };
}

export const initialMovieState: IMovies = {
  movies: {
    data: [],
    isLoading: false,
    error: '',
  },
  likes: {},
};

export const initialMovie: IMovie = {
  score: 0,
  show: {
    id: '',
    name: '',
    status: '',
    rating: {
      average: 0,
    },
    image: {
      medium: '',
      original: '',
    },
    summary: '',
  },
}

let counter = 0;
export const api = (endpoint: string) => {
  if (++counter % 4 === 0) {
    return 'err';
  }
  return `http://api.tvmaze.com/${endpoint}`;
}
