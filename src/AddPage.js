/**
 * Created by RemyTruong on 2017-05-10.
 */
import React, { Component } from 'react';
import { Grid, FormGroup, FormControl, Row, Col, Image,ControlLabel, Button,ButtonGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class AddPage extends Component {
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

export default AddPage;