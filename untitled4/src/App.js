import React, { Component } from 'react';
import './App.css';
import {
  Nav, NavItem, Navbar, Button, Panel, FormGroup, FormControl, Grid, Row, Col, Image,
  ControlLabel, ButtonGroup, Jumbotron
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav />
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>This is my home page</h1>
        <BotNav />
      </div>
    );
  }
}

class Listing extends Component {
  render() {
    return (
      <div className="Listing">
        <FolderDrop />
        <FolderDrop />
        <FolderDrop />
        <BotNav />
      </div>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <h1>This is my profile page</h1>
      </div>
    );
  }
}

class Affiliate extends Component {
  render() {
    return (
      <div className="Affiliate">
        <h1>This is my affiliate page</h1>
      </div>
    );
  }
}

class Post extends Component {
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
    return(
      <div className="addPage">
        <Grid>
          <Row>
            <Col xs={3}>
              <Image src="/thumbnail.png" circle />
            </Col>
            <Col xs={8} xsOffset={1}>
              <form>
                <FormGroup>
                  <ControlLabel>Food name</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Food Name"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Condition</ControlLabel>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select">Good</option>
                    <option value="other">Bad</option>
                  </FormControl>
                </FormGroup>
              </form>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={12}>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Please add a description!" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="addButtons">
            <Col xs={12}>
              <ButtonGroup bsSize="sm">
                <Button>Reset</Button>
                <Button>Submit</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Grid>
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
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
            {' '}
            <Button bsStyle="primary" type="submit"><Link to="/post">Post!</Link></Button>
          </Navbar.Form>
        </Navbar>
      </div>
    );
  }
}

class Login extends Component {
  render() {
    function handleClick() {
      alert('logged in!');
    }
    return (
      <Jumbotron className="Absolute-Center is-Responsive">
        <h2>Welcome to F2E!</h2><hr />
        <Button className="facebookButton" bsStyle="primary"
                onClick={handleClick}>Log in with facebook!</Button>
      </Jumbotron>
    )
  }
}

class TopNav extends Component {
  render() {
    return (
      <Router history="browserHistory">
        <div className="Top-nav">
          <Navbar>
            <Nav bsStyle="pills">
              <NavItem><Link to="/">Home</Link></NavItem>
              <NavItem><Link to="/listing">Listing</Link></NavItem>
              <NavItem><Link to="/profile">Profile</Link></NavItem>
              <NavItem><Link to="/affiliate">Affiliate</Link></NavItem>
            </Nav>
          </Navbar>

          <Route exact path="/" component={Home} />
          <Route path="/listing" component={Listing} />
          <Route path="/profile" component={Profile} />
          <Route path="/affiliate" component={Affiliate} />
          <Route path="/post" component={Post} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    )
  }
}

export default App;
