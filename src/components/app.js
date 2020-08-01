import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Switch, Route, withRouter} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import ChildShow from './ChildShow';
import ChildEdit from './ChildEdit';
import UserEdit from './auth/UserEdit';
import Login from './auth/Login';
import history from './history';
import Registration from './auth/Registration';


 class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  checkLoginStatus(){
    axios.get("http://localhost:3001/logged_in", { withCredentials: true }).then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    }).catch(error => {
      console.log("login error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
    history.push("/dashboard");
}

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })

  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route 
            exact path={"/"} 
            render= {props => (
              <Home {...props} handleLogin = {this.handleLogin} handleLogout = {this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
            )}
            />
            <Route 
            exact path={"/login"} 
            render= {props => (
              <Login {...props} handleLogin = {this.handleLogin} handleLogout = {this.handleLogout} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth = {this.handleSuccessfulAuth} />
            )}
            />
            <Route 
            exact path={"/register"} 
            render= {props => (
              <Registration {...props} handleLogin = {this.handleLogin} handleLogout = {this.handleLogout} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth = {this.handleSuccessfulAuth} />
            )}
            />
            <Route 
            exact path={"/useredit/:id"} 
            render= {props => (
              <UserEdit {...props} handleLogin = {this.handleLogin} handleLogout = {this.handleLogout} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth = {this.handleSuccessfulAuth} user={this.state.user}/>
            )}
            />
            <Route 
            exact path={"/dashboard"} 
            render= {props => (
              <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} handleLogout = {this.handleLogout} user={this.state.user}/>
            )}
            />
             <Route 
            exact path={"/child/:id"} 
            render= {props => (
              <ChildShow {...props} loggedInStatus={this.state.loggedInStatus} handleLogout = {this.handleLogout} user={this.state.user}/>
            )}
            />
            <Route 
            exact path={"/children/:id/edit"} 
            render= {props => (
              <ChildEdit {...props} loggedInStatus={this.state.loggedInStatus} handleLogout = {this.handleLogout} user={this.state.user}/>
            )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(App);