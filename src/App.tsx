import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { selectDarkMode } from './app/store/globalSlice';
import Movies from './components/Movies';
import Header from './components/Header';

function App() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-100">
        <Header />
        <Movies />
      </div>
        
    </div>
  );
}

export default App;
