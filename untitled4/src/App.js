import React, { Component } from 'react';
import './App.css';
import {
  Nav, NavItem, Navbar, Button, Panel, FormGroup, FormControl, Grid, Row, Col, Image,
  ControlLabel, ButtonGroup, Jumbotron, Checkbox, Modal, Glyphicon, NavDropdown, MenuItem
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

class Map extends Component {
  render() {
    return (
      <div className="Map">
        <h1>This is my map page!</h1>
        <BotNav />
      </div>
    );
  }
}

class Profile extends Component {
  render() {
    return(
      <div>
        <Grid>
          <Row>
            <Col sm={12}>
              <Image src="/thumbnail.png" rounded/>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <p>Name here; image above</p>
              <p>Reputation here</p>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div>
                                <textarea>
                                Stats go here!
                            </textarea>
              </div>
              <div>
                <Button bsSize="small"><Glyphicon glyph="cog"/> Settings</Button>
              </div>
              <div>
                <Button bsSize="small"><Glyphicon glyph="thumbs-up"/> My interactions </Button>
              </div>
              <div>
                <Button bsSize="small"><Glyphicon glyph="heart"/> My Friends </Button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


class Affiliate extends Component {
  render() {
    return(
      <Jumbotron>
        <h1>Our friends!</h1>
        <p>Our app helps in getting ingredients to you, but here are some of our friends that can help you in your food ingredient endeavours!</p>
        <br />
        <Grid>
          <Row>
            <Col sm={3}>
              <Image src="/taketwo.png" rounded responsive/>
            </Col>
            <Col sm={8} smOffset={1}>
              <div>
                <p>
                  Take any two ingredients you have in your fridge, and figure out what you can make! If you are missing anything, use our app to find stuff!
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Image src="./wasted.png" rounded responsive/>
            </Col>
            <Col sm={8} smOffset={1}>
              <div>
                <p>
                  You don't want to post anything that may go bad do you? With the help of Wasted, you can track your food and be notified on when they're going bad!
                </p>
              </div>

            </Col>
          </Row>
          <Row>
            <Col sm={3}>

            </Col>
            <Col sm={8} smOffset={1}>

            </Col>
          </Row>
        </Grid>
      </Jumbotron>
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
    this.state={showModal : false};
  }
  handleClick() {
    this.setState={showModal : true};
  }
  close() {
    this.setState={showModal : false};
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
              {' '}
              <Button type="submit">Search</Button>
              {' '}
              <Button bsStyle="primary" type="submit">
                <Link to="/post">Post!</Link>
              </Button>
            </Navbar.Form>
          </Navbar>
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
          </Modal>
        </div>
      </div>
    );
  }
}

class Login extends Component {
  constructor() {
    super();
    this.render.bind(this);
    this.state = {showModal: false}
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <span onClick={this.open.bind(this)}>Log in</span>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Body>
            <h4>Welcome to F2E!</h4>
            <Button className="facebookButton"
                    bsStyle="primary">
              Log in with facebook!
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
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
              <NavItem><Link to="/map">Map</Link></NavItem>
              <NavItem><Link to="/profile">Profile</Link></NavItem>
              <NavItem><Link to="/affiliate">Affiliate</Link></NavItem>
              <NavDropdown title="Options" pullRight="true">
                <MenuItem><Login /></MenuItem>
                <MenuItem><Link to="/">Log out</Link></MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>

          <Route exact path="/" component={Home} />
          <Route path="/listing" component={Listing} />
          <Route path="/map" component={Map} />
          <Route path="/profile" component={Profile} />
          <Route path="/affiliate" component={Affiliate} />
          <Route path="/post" component={Post} />
        </div>
      </Router>
    )
  }
}

export default App;
