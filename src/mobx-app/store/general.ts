import { makeAutoObservable, makeObservable, observable, action } from 'mobx';
import { IGeneral } from '../../types';


class General implements IGeneral {
  darkMode = false;

  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, {
    //   darkMode: observable,
    //   setDarkMode: action,
    // });
  }

  setDarkMode() {
    this.darkMode = !this.darkMode;
  }
}

export const generalStore = new General();