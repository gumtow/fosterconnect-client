import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Default from '../Default';


export default class ChildShow extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };

    }


    getChildData(){
        axios.get(`https://fosterconnect-api.herokuapp.com/children/${this.props.match.params.id}`, {withCredentials: true}).then(response => {
            this.setState({
                child: response.data
            })
        }).catch(error => {
            console.log("children db", error);
        })
        axios.get(`https://fosterconnect-api.herokuapp.com/items`, {withCredentials: true}).then(response => {
            this.setState({
                items: response.data
            })
        }).catch(error => {
            console.log("item db", error);
        })
    }

    componentDidMount(){
        this.getChildData();
    }

    handleLogoutClick=()=> {
        axios.delete("https://fosterconnect-api.herokuapp.com/logout", { withCredentials: true }).then(response =>{
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
                        <div>
                            {this.state.items && this.state.items.map((item, i)=>{
                                if (item.child_id === this.state.child.id){
                                    return(
                                        <div key={i}>
                                            <img src={item.image} alt={item.id}/>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div>
                            {this.state.items && this.state.items.map((item, i)=>{
                                if (item.child_id === this.state.child.id){
                                    return(
                                        <div key={i}>
                                            <a href={item.file} download>{this.state.child.name} doc {i}</a>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </Default>
            )
        } else {
            return "...loading"
        }
    }
}

