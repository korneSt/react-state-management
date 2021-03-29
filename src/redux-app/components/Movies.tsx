import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa';
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
    props.getMovies('dark');
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
      <div className="h-full w-full">
        <div className="my-32 flex flex-col justify-center items-center text-gray-400">
          <FaRegTimesCircle className="text-6xl"/>
          <p className="text-2xl">Error</p>
        </div>
    </div>
    );
  }

  if (!props.movies.data.length) {
    return (
      <div className="h-full w-full">
        <div className="my-32 flex flex-col justify-center items-center text-gray-400">
          <FaSearch className="text-6xl"/>
          <p className="text-2xl">Search shows</p>
        </div>
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