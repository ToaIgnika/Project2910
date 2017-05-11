/**
 * Created by remtr on 5/11/2017.
 */
import React, { Component } from 'react';
import { Grid, FormGroup, FormControl, Row, Col, Image,ControlLabel, Button,ButtonGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class Account extends Component {
    render() {
        render(
            <div>
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <Image src="/thumbnail.png" rounded/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <p>Name here</p>
                            <p>Reputation here</p>
                            <textarea>
                                Stats go here!
                            </textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <div>
                                <p>Stats go here!</p>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Account;