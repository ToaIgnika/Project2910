
/**
 * Created by remtr on 5/11/2017.
 */
import React, { Component } from 'react';
import { Grid, FormGroup, FormControl, Row, Col, Image,ControlLabel, Button,ButtonGroup, Checkbox, Jumbotron} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class Affiliates extends Component {
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

export default Affiliates