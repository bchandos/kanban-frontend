import React from 'react';
import Board from './Components/Board';
import './App.css';

function App() {

  return (
    <div>
      <Board id="1" />
      <footer className="w3-container w3-gray">
          <div className="right-align">
            &copy; 2020 <a href="https://billchandos.dev">billchandos.dev</a>
          </div>
      </footer>
    </div>
  )
}

export default App;
