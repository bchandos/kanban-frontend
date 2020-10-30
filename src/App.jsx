import React from 'react';
import BoardContainer from './Components/BoardContainer';
// import './w3.css';
import './App.css';

function App() {

  return (
    <div>
      <BoardContainer />
      <footer className="w3-container w3-gray">
          <div className="right-align">
            &copy; 2020 <a href="https://billchandos.dev">billchandos.dev</a>
          </div>
      </footer>
    </div>
  )
}

export default App;
