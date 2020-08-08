import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Default from '../Default';
import { FlexContainer } from '../style/default';
import * as Headings from '../style/type';
import { EditBtn } from '../style/buttons';
import { COLORS } from '../style/constants';


export default class ChildShow extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };

    }


    getChildData() {
        axios.get(`https://fosterconnect-api.herokuapp.com/children/${this.props.match.params.id}`, { withCredentials: true }).then(response => {
            this.setState({
                child: response.data
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

    componentDidMount() {
        this.getChildData();
    }

    handleLogoutClick = () => {
        axios.delete("https://fosterconnect-api.herokuapp.com/logout", { withCredentials: true }).then(response => {
            this.props.handleLogout();
            this.props.history.push("/");
        }).catch(error => {
            console.log("logout error", error);
        });
    }



    render() {
        if (this.state.child) {
            return (
                <Default>
                    <FlexContainer reverse="column">
                        <Headings.H1 darkBlue>{this.state.child.name}</Headings.H1>
                        <Headings.P color={COLORS.darkBlue}>{this.state.child.description}</Headings.P>
                        <Headings.H2>Images</Headings.H2>
                        <div>
                            {this.state.items && this.state.items.map((item, i) => {
                                if (item.image && (item.child_id === this.state.child.id)) {
                                    return (
                                        <div key={i}>
                                            <img src={item.image} alt={item.id} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <Headings.H2>Documents</Headings.H2>
                        <div>
                            {this.state.items && this.state.items.map((item, i) => {
                                if (item.file && (item.child_id === this.state.child.id)) {
                                    return (
                                        <div key={i}>
                                            <a href={`${item.file} .jpg`}>{this.state.child.name} doc {i}</a>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <Link to={`/children/${this.state.child.id}/edit`}><EditBtn>Edit</EditBtn></Link>
                    </FlexContainer>
                </Default>
            )
        } else {
            return "...loading"
        }
    }
}

