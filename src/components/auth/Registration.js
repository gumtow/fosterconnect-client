import React, { Component } from 'react';
import axios from 'axios';

export default class Registration extends Component {
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
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(event) {
        axios.post("http://localhost:3001/registrations", {
            user: {
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
        }, 
        { withCredentials: true }
        ).then(response =>{
            if (response.data.status === 'created') {
                this.props.handleSuccessfulAuth(response.data);
            }
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
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />
            <input type="password" name="password_confirmation" placeholder="confirm password" value={this.state.password_confirmation} onChange={this.handleChange} required />
            <button type="submit">register</button>
        </form>
      </div>
    );
  }
}