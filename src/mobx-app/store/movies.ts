import { makeAutoObservable, makeObservable, observable, action } from 'mobx';

interface IMovie {
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

interface LoadingData {
  isLoading: boolean;
  error: string;
}

interface IMovies {
  movies: {
    data: IMovie[];
  } & LoadingData;
  likes: {
    [key: string]: number;
  };
}

const initialMovie: IMovie = {
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

const api = (endpoint: string) => (`http://api.tvmaze.com/${endpoint}`);


class Movies implements IMovies {
  movies = {
    data: [initialMovie],
    isLoading: false,
    error: '',
  };
  likes: {
    [key: string]: number;
  } = {};
  
  constructor() {
    makeAutoObservable(this);
  }

  async getMovies(query: string) {
    this.movies.isLoading = true;
    try {

      const response = await fetch(api(`search/shows?q=${query || 'a'}`));
      const movies = await response.json() as IMovie[];
      
      this.movies.data = movies;
      this.movies.isLoading = false;
    } catch (err) {
      this.movies.error = err;
      this.movies.isLoading = false;
    }
  }

  like(name: string) {
    this.likes[name] = (this.likes[name] || 0) + 1; 
  }
  
  dislike(name: string) {
    this.likes[name] = (this.likes[name] || 0) - 1; 
  }
  
  getmovieLikes(name: string) {
    return this.likes[name];
  }

  get mostLiked() {
    const likes = Object.entries(this.likes);
    const top = likes.reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), likes[0]);

    return top ? top[0] : "-";
  }
};

export const moviesStore = new Movies();