import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Default from '../Default';
import { GridContainer, FlexContainer, ChildMapGrid, ChildMapFlex } from '../style/default';
import { Button, EditBtn } from '../style/buttons';
import * as Headings from '../style/type';
import { COLORS } from '../style/constants';



export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            status: "Active",
            children: [],
            description: "",
            image: {}

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    getChildData() {
        axios.get("https://fosterconnect-api.herokuapp.com/children", { withCredentials: true }).then(response => {
            this.setState({
                children: response.data
            })
        }).catch(error => {
            console.log("children db", error);
        })
    }

    componentDidMount() {
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
        this.setState(() => {
            return {
                [event.target.name]: event.target.files[0]
            }
        })
    };

    // file upload button clicked
    onFileUpload = () => {
        const formData = new FormData();

        formData.append("image", this.state.image)
        formData.append("name", this.state.name)
        formData.append("status", this.state.status)
        formData.append("description", this.state.description)

        axios.post("https://fosterconnect-api.herokuapp.com/children", formData, { withCredentials: true })
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log("ITEM ERROR", error);
            });
    };


    handleSubmit(event) {
            
            axios.post("https://fosterconnect-api.herokuapp.com/children", {
            name: this.state.name,
            status: this.state.status,
            user_id: this.props.user.id,
            description: this.state.description
        },
            { withCredentials: true }
        ).then(response => {
            // console.log(response);
            this.setState({
                name: "",
                status: "Active",
                image: "",
                description: ""
            })
        }
        );
        getChildData();
        event.preventDefault();
    };

    handleLogoutClick = () => {
        axios.delete("https://fosterconnect-api.herokuapp.com/logout", { withCredentials: true }).then(response => {
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        });
    }

    handleDelete(id) {
        axios.delete(`https://fosterconnect-api.herokuapp.com/children/${id}`, { withCredentials: true }).then(response => {
            console.log(response);
            this.getChildData();
        }).catch(error => {
            console.log("logout error", error);
        });

    }



    render() {
        // console.log(this.props.user.id)
        return (
            <Default>
                <div>
                    <GridContainer>
                        <FlexContainer reverse="column">
                            <img src="https://raw.githubusercontent.com/gumtow/fosterconnect-client/master/static/assets/img/circle.png" />
                            <Link to={`/useredit/${this.props.user.id}`} user={this.props.user}><EditBtn>Edit User Profile</EditBtn></Link>
                        </FlexContainer>

                        <FlexContainer reverse="column">
                            <Headings.H1 darkBlue margin="0">Hello</Headings.H1>
                            <Headings.P color={COLORS.darkBlue}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit ut amet rhoncus, nunc ullamcorper proin cras. </Headings.P>

                            {this.state.children.map((child, i) => {
                                if (child.user_id === this.props.user.id) {
                                    // console.log(child.id);
                                    return (
                                        <ChildMapFlex key={i}>
                                            <ChildMapGrid>
                                                <img src="https://raw.githubusercontent.com/gumtow/fosterconnect-client/master/static/assets/img/circle.png" />
                                                <ChildMapFlex reverse="column">
                                                    <Headings.H3 darkBlue  margin="0">{child.name}</Headings.H3>
                                                    <Headings.P color={COLORS.darkBlue} margin="0">{child.status}</Headings.P>
                                                </ChildMapFlex>
                                                <ChildMapFlex reverse="column">
                                                    <EditBtn><Link to={`/child/${child.id}`} child={child}>View Profile</Link></EditBtn>
                                                    <EditBtn><Link to={`/children/${child.id}/edit`}>Edit</Link></EditBtn>
                                                    <EditBtn onClick={() => this.handleDelete(`${child.id}`)}>Delete</EditBtn>
                                                </ChildMapFlex>
                                            </ChildMapGrid>
                                        </ChildMapFlex>
                                    )
                                }
                            })}

                            <form onSubmit={this.handleSubmit} >
                                <input type="string" name="name" placeholder="Child's name" value={this.state.name} onChange={this.handleChange} required />
                                <input type="string" name="status" placeholder={this.state.status} value={this.state.status} onChange={this.handleChange} required />
                                <input type="string" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
                                {/* <input type="file" name="image" placeholder="Upload an image" onChange={this.onFileChange}  /> */}
                        {/* <button onClick={this.onFileUpload}>upload</button> */}
                                <Button type="submit">Add Child</Button>
                            </form>
                        </FlexContainer>
                    </GridContainer>
                </div>
            </Default>
        );

    }
}