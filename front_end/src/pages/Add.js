import React, { Component } from 'react';
import axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Add extends Component {

  constructor(props) {
    super(props);

    this.apiEndpoint = 'http://172.104.180.29/api/';
    this.state = {
      loading:false,
      title:'',
      author:'',
      redirect:false
    }
  }

  _submit = (e) => {
    e.preventDefault();

    axios.post(this.apiEndpoint+'book/add', {
      title: this.state.title,
      author: this.state.author
    })
    .then((response) => {
      if(response.data.status === 1){
        this.setState({redirect:true})
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {

    if(this.state.redirect){
      return <Redirect to={'/'} />
    }

    return (
      <div className="form">
        <Link to={"/"} className="top-link">Back</Link>
        <Form method="post" onSubmit={this._submit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="Enter Title" required value={this.state.title} onChange={(evt)=>{this.setState({title:evt.target.value})}} />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control placeholder="Enter Author" required value={this.state.author} onChange={(evt)=>{this.setState({author:evt.target.value})}} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={ this.state.loading }>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}