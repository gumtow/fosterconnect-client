import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, withRouter, Link } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import ChildShow from './ChildShow';
import ChildEdit from './ChildEdit';
import UserEdit from './auth/UserEdit';
import Login from './auth/Login';
import history from './history';
import Registration from './auth/Registration';
import Default from '../Default';
import { Nav } from '../style/nav';
import { AuthBtn } from '../style/buttons';
import * as Headings from '../style/type';
import { FlexContainer } from '../style/default';
import { COLORS } from '../style/constants';


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  checkLoginStatus() {
    axios.get("https://fosterconnect-api.herokuapp.com/logged_in", { withCredentials: true }).then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
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

  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
    history.push("/");
  }

  handleLogoutClick() {
    axios.delete("https://fosterconnect-api.herokuapp.com/logout", { withCredentials: true }).then(response => {
      this.handleLogout();
    }).catch(error => {
      console.log("logout error", error);
    });
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
    history.push("/dashboard");

  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
         {/* Nav Header */}
         <Default bg="#495867" height="100px">
          <Nav>
            <h1>FosterConnect</h1>
            {/* <h2>Status: {this.props.loggedInStatus}</h2> */}

            {this.state.loggedInStatus === "NOT_LOGGED_IN" ? <Link to="/login"><AuthBtn>Log In</AuthBtn></Link> : <AuthBtn onClick={() => this.handleLogoutClick()} >Logout</AuthBtn>}

          </Nav>
        </Default>
        
        
          <Switch>
            <Route
              exact path={"/"}
              render={props => (
                <Home {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              exact path={"/login"}
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth={this.handleSuccessfulAuth} />
              )}
            />
            <Route
              exact path={"/register"}
              render={props => (
                <Registration {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth={this.handleSuccessfulAuth} />
              )}
            />
            <Route
              exact path={"/useredit/:id"}
              render={props => (
                <UserEdit {...props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} handleSuccessfulAuth={this.handleSuccessfulAuth} user={this.state.user} />
              )}
            />
            <Route
              exact path={"/dashboard"}
              render={props => (
                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} user={this.state.user} />
              )}
            />
            <Route
              exact path={"/child/:id"}
              render={props => (
                <ChildShow {...props} loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} user={this.state.user} />
              )}
            />
            <Route
              exact path={"/children/:id/edit"}
              render={props => (
                <ChildEdit {...props} loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} user={this.state.user} />
              )}
            />
          </Switch>

        {/* Footer */}
        <Default bg="#495867"  footer height="650px">
          <FlexContainer reverse="column">
            <Headings.H3 center padding="1rem 12rem">
              "I alone cannot change the world, but I can cast a stone across the waters to create many ripples."
          </Headings.H3>
            <Headings.P>
              Mother Teresa
            </Headings.P>
          </FlexContainer>
          <FlexContainer reverse="column">
            <Headings.P>
              Created &amp; Designed with love in Austin, TX by
              </Headings.P>
            <Headings.P color={COLORS.gold}>
              Jesse Gumtow
            </Headings.P>
          </FlexContainer>
          <FlexContainer>
            <Headings.P>
              <Headings.A href="#" target="_blank">GitHub</Headings.A>  |  <Headings.A href="#" target="_blank">LinkedIn</Headings.A>  |  <Headings.A href="#" target="_blank">Medium</Headings.A>
          </Headings.P>
          </FlexContainer>
        </Default>

        </BrowserRouter>
      </div>
    );
  }
}
