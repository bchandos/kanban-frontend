import React from 'react';
import BoardContainer from './Components/BoardContainer';
import Login from './Components/Login';
// import './w3.css';
import './App.css';
import jwt_decode from 'jwt-decode';
import { checkToken } from './api/api';

class App extends React.Component {

  state = {
    userId: null,
  }

  verifyToken = async () => {
    let userId;
    const jwt = localStorage.getItem('jwt');
    if (jwt && await checkToken(jwt)) {
      userId = jwt_decode(jwt).userId;
    } else {
      // localStorage.setItem('jwt', null);
      userId = null;
    }
    this.setState({
      userId
    })
  }

  async componentDidMount() {
    await this.verifyToken();
  }


  render() {
    return (
        <div>
          { this.state.userId ? <BoardContainer userId={this.state.userId} /> : <Login verifyToken={this.verifyToken} />}
          <footer className="w3-container w3-gray footer">
              <div className="w3-right w3-padding">
                &copy; 2020 <a href="https://billchandos.dev">billchandos.dev</a>
              </div>
          </footer>
        </div>
    )
  }
}

export default App;
