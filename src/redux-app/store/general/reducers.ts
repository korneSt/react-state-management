import { IGeneral, initialGeneralState } from "../../../types";
import { GeneralActions } from "./actions";
import * as CONS from './constants';


const generalReducer = (state = initialGeneralState, action: GeneralActions): IGeneral => {
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

export default generalReducer;