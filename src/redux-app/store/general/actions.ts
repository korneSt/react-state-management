import * as CONS from './constants';

export function setDarkMode() {
  return {
    type: CONS.SET_DARK_MODE,
  } as const;
}

export type GeneralActions = ReturnType<typeof setDarkMode>;