/**
 * Created by remtr on 5/11/2017.
 */
import React, { Component } from 'react';
import {Glyphicon, Grid, FormGroup, FormControl, Row, Col, Image,ControlLabel, Button,ButtonGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';


class PostView extends Component {
render() {
    return (
        <div className="postView">
            <Grid>
                <Row>
                    <Col xs={3}>
                        <Image src="/thumbnail.png" circle />
                    </Col>
                    <Col xs={8} xsOffset={1}>
                        <div>
                            <p>Other user's name</p>
                            <p>Other user's reputation</p>
                            <br />
                            <p>Food Item</p>
                            <p>Condition</p>
                        </div>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={12}>
                        <div>
                            <p>Description here</p>
                        </div>
                    </Col>
                </Row>
                <Row className="addButtons">
                    <Col sm={12}>
                        <Button bsSize="small"><Glyphicicon glyph="comment"/>Contact</Button>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
}
}

export default PostView