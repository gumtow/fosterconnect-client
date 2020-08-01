import React, { Component } from 'react';
import axios from 'axios';

export default class UserEdit extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        axios.put(`http://localhost:3001/registrations/${this.props.user.id}`, {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        }, 
        { withCredentials: true }
        ).then(response =>{
            this.props.history.push("/dashboard");
            // if (response.data.status === 'updated') {
            //     this.props.handleSuccessfulAuth(response.data);
            // }
        }).catch(error =>{
            console.log("reg error", error);
        })
        event.preventDefault();
    };
    
  render() {
    return (
      <div className='registration'>
        <form onSubmit={this.handleSubmit} >
            <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handleChange} required />
            <input type="password" name="password" placeholder="update password" value={this.state.password} onChange={this.handleChange} required />
            <input type="password" name="password_confirmation" placeholder="confirm password" value={this.state.password_confirmation} onChange={this.handleChange} required />
            <button type="submit">Update your account</button>
        </form>
      </div>
    );
  }
}