import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../store';
import {
  getMovies,
} from '../store/movies/actions';

import OneMovie from './Movie';

type TProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface Props extends TProps {}

const Movies: React.FC<Props> = (props)=> {

  // run once
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

  if (props.movies.error) {
    return (
      <div className="h-full w-full flex justify-center">
        <p className="my-32 text-4xl dark:text-gray-100">Error Loading Data</p>
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