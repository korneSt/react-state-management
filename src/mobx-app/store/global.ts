import { makeAutoObservable, makeObservable, observable, action } from 'mobx';

interface IGlobal {
  darkMode: boolean
}

class Global implements IGlobal {
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


export const globalStore = new Global();