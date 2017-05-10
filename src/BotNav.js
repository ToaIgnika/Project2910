/**
 * Created by RemyTruong on 2017-05-10.
 */
import React, { Component } from 'react';
import {Nav, NavItem, Button, Panel, FormGroup, Form, FormControl, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class BotNav extends Component {
    constructor() {
        super();
        this.state= {
            value : ''
        }
    }

    handleChange(e) {
        this.setState({ value : e.target.value})
    }


    render() {
        return (
            <div className="Bot-nav">
                <FormGroup>
                    <FormControl type="text" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
                </FormGroup>
                {' '}
                <Button type="submit">Submit</Button>
                <Button bsStyle="primary" type="submit">Request</Button>
                <Button bsStyle="primary" type="submit">Post</Button>
            </div>
        );
    }
}

export default BotNav;