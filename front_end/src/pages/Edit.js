import React, { Component } from 'react';
import axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Edit extends Component {

  constructor(props) {
    super(props);

    this.apiEndpoint = 'http://172.104.180.29/api/';
    this.state = {
      loading:false,
      submitting:false,
      id:null,
      redirect:false,
      author:''
    }
  }

  componentDidMount(){

    const id = this.props.match.params.id;

    this.setState({
      loading:true,
      id:id
    });

    axios.get(this.apiEndpoint+'book/edit/'+id)
    .then((response) => {
      this.setState({
        author:response.data.book.author,
        loading:false
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _submit = (e) => {
    e.preventDefault();

    this.setState({submitting:true});

    axios.post(this.apiEndpoint+'book/edit', {
      id: this.state.id,
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

    if(this.state.loading){
      return <p>Loading...</p>
    }

    if(this.state.redirect){
      return <Redirect to={'/'} />
    }

    return (
      <div className="form">
        <Link to={"/"} className="top-link">Back</Link>
        <Form method="post" onSubmit={this._submit}>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control placeholder="Enter Author" required value={this.state.author} onChange={(evt)=>{this.setState({author:evt.target.value})}} />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={ this.state.submitting }>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}