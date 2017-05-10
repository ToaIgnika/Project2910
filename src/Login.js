/**
 * Created by RemyTruong on 2017-05-09.
 */
import React, { Component } from 'react';
import { Jumbotron, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Login.css'

class Login extends Component {
    render() {
        return (
            <div className="Absolute-Center is-Responsive">
                <div>
                    <h2>Welcome to F2E!</h2>
                    <Button className="facebookButton" bsStyle="primary">Log in with facebook!</Button>
                </div>
            </div>
        );
    }
}

export default Login