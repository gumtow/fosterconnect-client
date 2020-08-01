import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class ChildEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            image: {},
            file: {}
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    getChildData(){
        axios.get(`http://localhost:3001/children/${this.props.match.params.id}`, {withCredentials: true}).then(response => {
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

    handleChange(event) {
        const updateInput = Object.assign( this.state.child, {[event.target.name]: event.target.value})
        this.setState(updateInput);
    };

    handleSubmit(event) {
        axios.put(`http://localhost:3001/children/${this.props.match.params.id}`, {
                name: this.state.name,
                status: this.state.status
        }, 
        this.onFileUpload(),
        { withCredentials: true }
        ).then(response =>{
            this.props.history.push("/dashboard");
            }
        );
        // getChildData();
        event.preventDefault();
    };

        // On file select
        onFileChange = event => {
            event.persist()
            this.setState(()=>{
                return{
                    [event.target.name]: event.target.files[0]
                }
            })
        };
    
        // file upload button clicked
        onFileUpload = () => {
            const formData = new FormData();
    
            formData.append("image", this.state.image)
            formData.append("child_id", this.state.child.id)
            formData.append("file", this.state.file)
            // console.log(this.state.selectedFile);
    
            axios.post("http://localhost:3001/items", formData, {withCredentials: true})
            .then( response =>{
                console.log(response);
            }).catch(error => {
                console.log("ITEM ERROR", error);
            });
        };

    handleLogoutClick=()=> {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        }); 
    }

    render(){
        if (this.state.child){
            return(
                <div>
                    <button onClick={()=>this.handleLogoutClick()}>Logout</button>
                    <h1>Hello {this.state.child.name}</h1>
                    <form onSubmit={this.handleSubmit} >
                        <input type="string" name="name" value={this.state.child.name} onChange={this.handleChange} required />
                        <input type="string" name="status" value={this.state.child.status} onChange={this.handleChange} required />
                        <input type="file" name="image" placeholder="Upload an image" onChange={this.onFileChange} required />
                        <input type="file" name="file" placeholder="Upload a document" onChange={this.onFileChange} />
                        <button type="submit">Update Child</button>
                    </form>
                </div>
            )
        } else {
            return "...loading"
        }
    }
}

