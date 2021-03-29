import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store';
import {
  getMovies,
} from '../store/moviesSlice';

import OneMovie from './Movie';

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

const Movies: React.FC<Props> = (props)=> {

  useEffect(() => {
    props.getMovies('');
  }, [])

  if (props.movies.isLoading) {
    return (
      <div className="h-full w-full flex justify-center">
        <p className="my-32 loader"></p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {props.movies.data.map((el) => (
        <OneMovie key={el.show.id} movie={el} />
      ))}
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    movies: state.movies.movies,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({
    getMovies,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);