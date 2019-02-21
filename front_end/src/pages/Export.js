import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Export extends Component {

  constructor(props) {
    super(props);

    this.apiEndpoint = 'http://172.104.180.29/api/';
  }

  componentDidMount(){
    let form = document.getElementById('f-export');
    let cb_title = document.getElementById('cb-title');
    let cb_author = document.getElementById('cb-author');

    form.addEventListener('submit',function(e){
      e.preventDefault();

      if(!cb_title.checked && !cb_author.checked){
        alert('Please select at least 1 Field.');
      } else {
        form.removeEventListener('submit',this);

        form.submit();
      }
    });
  }

  render() {

    return (
      <div className="form">
        <Link to={"/"} className="top-link">Back</Link>
        <Form id="f-export" method="post" action={this.apiEndpoint+'export'}>
          <Form.Group controlId="title">
            <Form.Label>Fields</Form.Label>
            <Form.Check 
              type={'checkbox'}
              id={'cb-title'}
              label={'Title'}
              name={'fields[]'}
              value='title'
            />
            <Form.Check 
              type={'checkbox'}
              id={'cb-author'}
              label={'Author'}
              name={'fields[]'}
              value='author'
            />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>File Type</Form.Label>
            <Form.Control as="select" name="type">
              <option value="csv">CSV</option>
              <option value="xml">XML</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}