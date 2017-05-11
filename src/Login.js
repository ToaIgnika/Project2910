/**
 * Created by RemyTruong on 2017-05-09.
 */
import React, { Component } from 'react';
import { Jumbotron, Button, Navbar, NavItem, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Login.css'


class Login extends Component {
    render() {
        function handleClick() {

        }

        return (
            <Jumbotron className="Absolute-Center is-Responsive">
                    <h2>Welcome to F2E!</h2><hr />
                    <Button className="facebookButton" bsStyle="primary"
                    onClick={handleClick}>Log in with facebook!</Button>
            </Jumbotron>
        );
    }
}

export default Login;