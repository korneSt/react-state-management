import { GlobalActions } from "./actions";
import { GlobalState } from './types';
import * as CONS from './constants';

const initialState: GlobalState = {
  darkMode: false,
};


const globalReducer = (state = initialState, action: GlobalActions): GlobalState => {
  switch(action.type) {
    case CONS.SET_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
}

export default globalReducer;