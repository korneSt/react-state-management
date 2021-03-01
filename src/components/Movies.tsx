import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { RootState } from '../app/store';
import {
  selectMovies,
  getMovies,
} from '../app/store/moviesSlice';
import OneMovie from './Movie';

type TProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface Props extends TProps {}

const Movies: React.FC<Props> = (props)=> {
  // const movies = useSelector(selectMovies);
  // const dispatch = useDispatch();

  useEffect(() => {
    props.getMovies('');
   
  }, [])

  if (props.movies.isLoading) {
    return (
      <div className="text-4xl flex justify-center align-middle h-screen">
        <p className="">Loading...</p>
      </div>
    );
  }

  return (
    <div>
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