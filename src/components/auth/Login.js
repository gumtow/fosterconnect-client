import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Default from '../../Default';

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        axios.post("https://fosterconnect-api.herokuapp.com/sessions", {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        }, 
        { withCredentials: true }
        ).then(response =>{
            console.log("res from login", response);
            if (response.data.logged_in) {
                this.props.handleSuccessfulAuth(response.data);
            }
        }).catch(error =>{
            console.log("login error", error);
        })
        event.preventDefault();
    };
    
  render() {
    return (
        <Default>
      <div className='registration'>
        <form onSubmit={this.handleSubmit} >
            <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} required />
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />

            <button type="submit">login</button>
        </form>
        <Link to="/register">Don't have an account?</Link>
      </div>
      </Default>
    );
  }
}