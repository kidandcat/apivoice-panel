import React, {Component} from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Col,
  ControlLabel,
  Checkbox,
  Panel
} from 'react-bootstrap';
let style;

class Out extends Component {
  constructor() {
    super();
    let self = this;
    this.submit = this.submit.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.configService = window.server.service('configs');
    this.state = {
      text: ''
    }
    this.getConfig((d) => {
      if (d.data.length > 0) {
        self.setState({text: d.data[0]['tiempoEntreLlamadas']
        });
      }
    });
  }

  submit(event) {
    let self = this;
    this.setState({text: event.target.value})

    this.getConfig((d) => {
      if (d.data.length > 0) {
        this.configService.patch(d.data[0]['_id'], {tiempoEntreLlamadas: self.state.text})
      } else {
        this.configService.create({tiempoEntreLlamadas: self.state.text});
      }
    });
  }

  getConfig(cb) {
    this.configService.find().then((c) => {
      cb(c);
    });
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Tiempo entre llamadas (minutos)
          </Col>
          <Col sm={10}>
            <FormControl onChange={this.submit} type="number" value={this.state.text} placeholder="Introduce el tiempo entre llamadas"/>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default Out;

style = {}
