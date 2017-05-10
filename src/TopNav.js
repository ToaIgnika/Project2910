/**
 * Created by RemyTruong on 2017-05-10.
 */
import React, { Component } from 'react';
import {Nav, NavItem, Button, Panel, FormGroup, Form, FormControl, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class TopNav extends Component {
    render() {
        function handleSelect(selectedKey) {
            alert('selected ' + selectedKey);
        }

        return (
            <div className="Top-nav">
                <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
                    <NavItem eventKey={1}>Home</NavItem>
                    <NavItem eventKey={2}>Listing</NavItem>
                    <NavItem eventKey={3}>Profile</NavItem>
                    <NavItem eventKey={4}>Affiliate</NavItem>
                </Nav>
            </div>
        );
    }
}

export default TopNav;