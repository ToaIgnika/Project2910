/**
 * Created by remtr on 5/11/2017.
 */
import React, { Component } from 'react';
import { Grid, FormGroup, FormControl, Row, Col, Image,ControlLabel, Button,ButtonGroup, Checkbox} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Settings.css'

class Settings extends Component {
    render() {
        return(
            <div>
                <Grid>
                    <Row>
                        <Col sm={3}>
                            <h2>Settings</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <div className="settingContent">
                                Settings go here! <br />
                                Logout,<br/>
                                etc.
                                <Checkbox > Allow facebook to spy on you forever? </Checkbox>
                                <Checkbox > Do you like pie? </Checkbox>
                                <Checkbox > Do you hate people? </Checkbox>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Settings