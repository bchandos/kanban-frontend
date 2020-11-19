import React from 'react';
import BoardContainer from './Components/BoardContainer';
import Login from './Components/Login';
// import './w3.css';
import './App.css';
import jwt_decode from 'jwt-decode';
import { checkToken } from './api/api';

class App extends React.Component {

  state = {
    user: null,
  }

  verifyToken = async () => {
    let user;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        await checkToken(jwt);
        user = jwt_decode(jwt).user;
      } catch(err) {
        localStorage.setItem('jwt', null);
        user = null;
      }
    } else {
      user = null;
    }
    this.setState({
      user
    })
  }

  async componentDidMount() {
    await this.verifyToken();
  }


  render() {
    return (
        <div>
          { this.state.user ? <BoardContainer user={this.state.user} verifyToken={this.verifyToken} /> : <Login verifyToken={this.verifyToken} />}
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
