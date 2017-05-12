/**
 * Created by RemyTruong on 2017-05-10.
 */
import React, { Component } from 'react';
import {Modal, Checkbox,Nav, NavItem, Button, Panel, FormGroup, Form, FormControl, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class BotNav extends Component {
    constructor() {
        super();
        this.state={
            showModal: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.close = this.close.bind(this);
    }
    handleClick() {
        this.setState({showModal: true});
    }
    close() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div>
                <div className="botNav">
                    <Navbar fixedBottom>
                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Search" />
                            </FormGroup>
                            {' '}
                            <Button onClick={this.handleClick}>Filters</Button>
                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Filters</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h3>Allergies</h3>
                                    <Checkbox checked readOnly>
                                        Peanut
                                    </Checkbox>
                                    <Checkbox checked readOnly>
                                        Seafood
                                    </Checkbox>
                                    <Checkbox checked readOnly>
                                        Milk
                                    </Checkbox>
                                    <Checkbox checked readOnly>
                                        Celiac
                                    </Checkbox>
                                    <Checkbox checked readOnly>
                                        Nuts
                                    </Checkbox>
                                    <Checkbox checked readOnly>
                                        Soy
                                    </Checkbox>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.close}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                            {' '}
                            <Button type="submit">Search</Button>
                            {' '}
                            <Button bsStyle="primary" type="submit">Post!</Button>
                        </Navbar.Form>
                    </Navbar>
                </div>
            </div>
        );
    }
}
export default BotNav;