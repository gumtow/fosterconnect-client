import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Default from '../Default';



export default class Dashboard extends Component {  

    constructor(props) {
        super(props);
    
        this.state = {
            name:"",
            status:"Active",
            pictures: [],
            documents:[],
            children: [],
            // selectedFile: null
            image: {},
            video: {}

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    getChildData(){
        axios.get("http://localhost:3001/children", {withCredentials: true}).then(response => {
            this.setState({
                children: response.data
            })
        }).catch(error => {
            console.log("children db", error);
        })
    }

    componentDidMount(){
        this.getChildData();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
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
        // formData.append("video", this.state.video)
        // console.log(this.state.selectedFile);

        axios.post("http://localhost:3001/items", formData, {withCredentials: true})
        .then( response =>{
            console.log(response);
        }).catch(error => {
            console.log("ITEM ERROR", error);
        });
    };

    // File content to be displayed after file upload is complete
    // fileData = () => {
    //     if (this.state.selectedFile){
    //         return(
    //             <div> 
    //         <h2>File Details:</h2> 
    //         <p>File Name: {this.state.selectedFile.name}</p> 
    //         <p>File Type: {this.state.selectedFile.type}</p> 
    //         <p> 
    //           Last Modified:{" "} 
    //           {this.state.selectedFile.lastModifiedDate.toDateString()} 
    //         </p> 
    //       </div> 
    //         );
    //     } else {
    //         return ( 
    //             <div> 
    //               <br /> 
    //               <h4>Choose before Pressing the Upload button</h4> 
    //             </div> 
    //           ); 
    //     }
    // };

    

    handleSubmit(event) {
        axios.post("http://localhost:3001/children", {
                name: this.state.name,
                status: this.state.status,
                pictures: this.state.pictures,
                documents: this.state.documents,
                user_id: this.props.user.id
        }, 
        { withCredentials: true }
        ).then(response =>{
            // console.log(response);
            this.setState({
                name:"",
                status:"Active",
                pictures: [],
                documents:[]
            })
            }
        );
        getChildData();
        event.preventDefault();
    };

    handleLogoutClick=()=> {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response =>{
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        }); 
    }

    handleDelete(id){
        axios.delete(`http://localhost:3001/children/${id}`, { withCredentials: true }).then(response =>{
            console.log(response);
            this.getChildData();
        }).catch(error => {
            console.log("logout error", error);
        }); 

    }


    
    render(){
        // console.log(this.props.user.id)
        return (
            <Default>
                <div>
                    <h1>Dashboard</h1>
                    <button onClick={()=>this.handleLogoutClick()}>Logout</button>
                    <Link to={`/useredit/${this.props.user.id}`} user={this.props.user}><button>Edit User Profile</button></Link>
                    <h2>Status: {this.props.loggedInStatus}</h2>
                    <form onSubmit={this.handleSubmit} >
                        <input type="string" name="name" placeholder="Child's name" value={this.state.name} onChange={this.handleChange} required />
                        <input type="string" name="status" placeholder={this.state.status} value={this.state.status} onChange={this.handleChange} required />
                        <input type="file" name="image" placeholder="Upload an image" value={this.state.pictures} onChange={this.onFileChange} required />
                        <button onClick={this.onFileUpload}>Upload</button>
                        {/* <div>
                            {this.fileData()}
                        </div> */}
                        <input type="string" name="documents" placeholder="document url" value={this.state.documents} onChange={this.handleChange} required />
                        <button type="submit">Add Child</button>
                    </form>
                    <div>
                        {this.state.children.map((child, i)=>{
                            if (child.user_id === this.props.user.id){
                                // console.log(child.id);
                                return(
                                    <div key={i}>
                                        <Link to={`/child/${child.id}`} child={child}><h3>{child.name}</h3></Link>
                                        <p>{child.status}</p>
                                        <Link to={`/children/${child.id}/edit`}><button>Edit</button></Link>
                                        <button onClick={()=>this.handleDelete(`${child.id}`)}>DELETE</button>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </Default>
        );

    }
}