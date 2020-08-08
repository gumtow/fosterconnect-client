import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Default from '../Default';
import { ItemMapGrid } from '../style/default';
import * as Headings from '../style/type';
import { EditBtn, Button } from '../style/buttons';
import { COLORS } from '../style/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ChildEdit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            image: "nil",
            file: "nil"
            
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    getChildData(){
        axios.get(`https://fosterconnect-api.herokuapp.com/children/${this.props.match.params.id}`, {withCredentials: true}).then(response => {
            this.setState({
                child: response.data,
                name: response.data.name,
                status: response.data.status,
                description: response.data.description
            })
        }).catch(error => {
            console.log("children db", error);
        })
        axios.get(`https://fosterconnect-api.herokuapp.com/items`, { withCredentials: true }).then(response => {
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

    handleChange(event) {
        const updateInput = Object.assign( this.state.child, {[event.target.name]: event.target.value})
        this.setState(updateInput);
    };

    handleSubmit(event) {
        axios.put(`https://fosterconnect-api.herokuapp.com/children/${this.props.match.params.id}`, {
                name: this.state.name,
                status: this.state.status, 
                description: this.state.description
        }, 
        this.onFileUpload(),
        { withCredentials: true },
        
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
            formData.append("child_id", this.state.child.id)
            if (this.state.image !== "nil") {
                formData.append("image", this.state.image)
            };       
            if (this.state.file !== "nil") {     
            formData.append("file", this.state.file)
            };
            // console.log(this.state.selectedFile);
    
            axios.post("https://fosterconnect-api.herokuapp.com/items", formData, {withCredentials: true})
            .then( response =>{
                console.log(response);
            }).catch(error => {
                console.log("ITEM ERROR", error);
            });
        };

    handleLogoutClick=()=> {
        axios.delete("https://fosterconnect-api.herokuapp.com/logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        }); 
    }

    handleDelete(id) {
        axios.delete(`https://fosterconnect-api.herokuapp.com/items/${id}`, { withCredentials: true }).then(response => {
            console.log(response);
            this.getChildData();
        }).catch(error => {
            console.log("logout error", error);
        });

    }

    render(){
        if (this.state.child){
            return(
                <Default>
                <div>
                    <Headings.H1 darkBlue>Edit - {this.state.child.name}</Headings.H1>
                    <form onSubmit={this.handleSubmit} >
                        <input type="string" name="name" value={this.state.child.name} onChange={this.handleChange} required />
                        <input type="string" name="status" value={this.state.child.status} onChange={this.handleChange} required />
                        <input type="string" name="description" value={this.state.child.description} onChange={this.handleChange} required />
                        <input type="file" name="image" placeholder="Upload an image" onChange={this.onFileChange}  />
                        
                        <input type="file" name="file" placeholder="Upload a document" onChange={this.onFileChange} />
                        <Button type="submit">Update Child</Button>
                        <Headings.H2>Images</Headings.H2>
                        <ItemMapGrid>
                            {this.state.items && this.state.items.map((item, i) => {
                                if (item.image && (item.child_id === this.state.child.id)) {
                                    return (
                                        <div key={i}>
                                            <img src={item.image} alt={item.id} />
                                            <EditBtn onClick={() => this.handleDelete(`${item.id}`)}>Delete Image</EditBtn>
                                        </div>
                                    )
                                }
                            })}
                        </ItemMapGrid>
                        <Headings.H2>Documents</Headings.H2>
                        <ItemMapGrid>
                            {this.state.items && this.state.items.map((item, i) => {
                                if (item.file && (item.child_id === this.state.child.id)) {
                                    return (
                                        <div className="doc" key={i}>
                                            <Headings.H3 darkBlue>Doc {i}</Headings.H3>
                                            <EditBtn onClick={() => this.handleDelete(`${item.id}`)}>Delete Document</EditBtn>
                                        </div>
                                    )
                                }
                            })}
                        </ItemMapGrid>
                        
                    </form>
                </div>
                </Default>
            )
        } else {
            return "...loading"
        }
    }
}

