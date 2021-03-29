import { IGlobal, initialGlobalState } from "../../../types";
import { GlobalActions } from "./actions";
import * as CONS from './constants';


const globalReducer = (state = initialGlobalState, action: GlobalActions): IGlobal => {
  switch(action.type) {
    case CONS.SET_DARK_MODE:
      return {
        // spread operator to always return new object
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
}

export default globalReducer;