import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Default from '../../Default';


export default class ChildShow extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };

    }


    getChildData(){
        axios.get(`https://fosterconnect-api.herokuapp.com//children/${this.props.match.params.id}`, {withCredentials: true}).then(response => {
            this.setState({
                child: response.data
            })
        }).catch(error => {
            console.log("children db", error);
        })
    }

    componentDidMount(){
        this.getChildData();
    }

    handleLogoutClick=()=> {
        axios.delete("https://fosterconnect-api.herokuapp.com//logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        }); 
    }

    render(){
        if (this.state.child){
            return(
                <Default>
                <div>
                    <button onClick={()=>this.handleLogoutClick()}>Logout</button>
                    <h1>Hello {this.state.child.name}</h1>
                    <Link to={`/children/${this.state.child.id}/edit`}><button>Edit</button></Link>
                </div>
                </Default>
            )
        } else {
            return "...loading"
        }
    }
}

