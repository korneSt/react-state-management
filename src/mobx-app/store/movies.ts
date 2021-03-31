import { makeAutoObservable, makeObservable, observable, action, runInAction } from 'mobx';
import { IMovie, IMovies, api } from '../../types';

class Movies implements IMovies {
  // class fields will be annotated as observable
  movies = {
    data: [] as IMovie[],
    isLoading: false,
    error: '',
  };
  likes: IMovies["likes"] = {};
  
  constructor() {
    makeAutoObservable(this);
  }

  // any class member that is function will be annotated with action
  async getMovies(query: string) {
    this.movies.isLoading = true;
    this.movies.error = '';
    try {
      const response = await fetch(api(`search/shows?q=${query}`));
      const movies = await response.json() as IMovie[];
      runInAction(() => {
        this.movies.data = movies;
        this.movies.isLoading = false;
        
      })
    } catch (err) {
      this.onMovieError(err);
    }
  }

  onMovieError(err: string) {
    this.movies.error = err;
    this.movies.isLoading = false;
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
  // get will be annotated with computed
  get mostLiked() {
    const likes = Object.entries(this.likes);
    const top = likes.reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), likes[0]);

    return top ? top[0] : "-";
  }
};

export const moviesStore = new Movies();