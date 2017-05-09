import React, { Component } from 'react';
import {Nav, NavItem, Button, Panel} from "react-bootstrap";
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

class BotNav extends Component {
  render() {
    return (
      <div className="Bot-nav">
        <Button bsStyle="primary" type="submit">Submit</Button>
        <Button bsStyle="primary" type="submit">Request</Button>
        <Button bsStyle="primary" type="submit">Post</Button>
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
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
          Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </Panel>
      </div>
    );
  }
}

export default App;
