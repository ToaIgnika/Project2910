/**
 * Created by remtr on 5/11/2017.
 */
import React, { Component } from 'react';
import {Glyphicon, Grid, FormGroup, FormControl, Row, Col, Image,ControlLabel, Button,ButtonGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

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

export default Profile;