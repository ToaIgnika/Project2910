import React, { Component } from 'react';
import {Nav, NavItem, Button, Panel, FormGroup, Form, FormControl, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';
//import Navbar from "react-bootstrap/es/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
        <FolderDrop />
        <FolderDrop />
        <FolderDrop />
        <BotNav />
      </div>
    );
  }
}

class FolderDrop extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      open: true
    };
  }

  render() {
    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          Listings
        </Button>
        <Panel collapsible expanded={this.state.open}>
          quid.
          Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </Panel>
      </div>
    );
  }
}

export default FolderDrop;
