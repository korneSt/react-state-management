import moviesReducer  from './movies/reducers';
import generalReducer  from './general/reducers';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

export const reducer = combineReducers({
  movies: moviesReducer,
  general: generalReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>;

