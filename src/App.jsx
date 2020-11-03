import React from 'react';
import BoardContainer from './Components/BoardContainer';
// import './w3.css';
import './App.css';

function App() {
  return (
    <div>
      <BoardContainer />
      <footer className="w3-container w3-gray footer">
          <div className="w3-right w3-padding">
            &copy; 2020 <a href="https://billchandos.dev">billchandos.dev</a>
          </div>
      </footer>
    </div>
  )
}

export default App;
