import React, { Component } from 'react';
import axios from 'axios';
import Default from '../Default';
import { Link } from 'react-router-dom';
import Login from './auth/Login';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleLogoutClick() {
        axios.delete("https://fosterconnect-api.herokuapp.com/logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
        }).catch(error => {
            console.log("logout error", error);
        });       
    }


  

  render() {
    return (
      <div className='home'>

        {/* Nav Header */}
        <Default bg="#495867" height="100px">
          <h1>Home</h1>
          <h2>Status: {this.props.loggedInStatus}</h2>
          {this.props.loggedInStatus === "NOT_LOGGED_IN" ? <Link to="/login"><button>Log In</button></Link> : <button onClick={()=>this.handleLogoutClick()} >Logout</button> }
        </Default>

        {/* Header */}
        <Default bg="url(https://raw.githubusercontent.com/gumtow/fosterconnect-client/master/static/assets/img/header-bg-edit%201header.png)" height="700px">

        </Default>


      {/* Body content */}
        <Default bg="#fff" height="50vh">
          <h1>Body content</h1>
        </Default>


      {/* Footer */}
        <Default bg="#495867" height="500px">

        </Default>

      </div>
    );
  }
}
