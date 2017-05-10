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
            <div className="botNav">
                <Navbar fixedBottom>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Search" />
                            </FormGroup>
                            {' '}
                            <Button type="submit">Submit</Button>&nbsp;
                        </Navbar.Form>
                        <Nav pullRight>
                            <NavItem><Button bsStyle="primary" type="submit">Post!</Button></NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
export default BotNav;