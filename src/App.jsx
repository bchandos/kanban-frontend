import React from 'react';
import './App.css';
import Board from './Components/Board';

function App() {

  return (
    <div className="App">
      <Board id="1" lanes={[1, 2, 3, 4]} />
    </div>
  )
}

export default App;
