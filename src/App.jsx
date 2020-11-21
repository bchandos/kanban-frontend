import React from 'react';
import BoardContainer from './Components/BoardContainer';
import Login from './Components/Login';
import Loading from './Components/Loading';
// import './w3.css';
import './App.css';
import jwt_decode from 'jwt-decode';
import { checkToken } from './api/api';

class App extends React.Component {

  state = {
    user: null,
    loadingToken: true,
  }

  verifyToken = async () => {
    this.setState({
      loadingToken: true,
    })
    let user;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const checked = await checkToken(jwt);
      if (checked) {
        user = jwt_decode(jwt).user;
      } else {
        localStorage.setItem('jwt', '');
        user = null;
      }
    } else {
      user = null;
    }
    this.setState({
      user,
      loadingToken: false,
    })
  }

  async componentDidMount() {
    await this.verifyToken();
  }


  render() {
    let mainContent;
    if (!this.state.loadingToken) {
      if (this.state.user) {
        mainContent = <BoardContainer user={this.state.user} verifyToken={this.verifyToken} />
      } else {
        mainContent = <Login verifyToken={this.verifyToken} />
      }
    } else {
      mainContent = <Loading />
    }
    return (
        <div>
          { mainContent }
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
