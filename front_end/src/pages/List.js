import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

export default class List extends Component {

  constructor(props) {
    super(props);

    this.apiEndpoint = 'http://localhost/yaraku/back_end/public/api/';
    this.state = {
      sortBy:'title',
      sortDir:'asc',
      keyword:'',
      loading:false,
      books:[]
    }
  }

  componentDidMount(){
    this._getBooks();
  }

  _getBooks(){

    this.setState({loading:true});

    axios.get(this.apiEndpoint+'books',{
      params:{
        sort_by:this.state.sortBy,
        sort_dir:this.state.sortDir,
        keyword:this.state.keyword
      }
    })
    .then((response) => {
      this.setState({
        books:response.data.books,
        loading:false
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  _delete = (e) => {
    e.preventDefault();

    const id = e.target.dataset.id;
    const name = e.target.dataset.name;

    if(window.confirm('Delete '+name+'?')){
      axios.post(this.apiEndpoint+'book/delete', {
        id: id
      })
      .then((response) => {
        if(response.data.status === 1){
          this._getBooks();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  _sort(sort_by){

    if(sort_by !== this.state.sortBy){
      this.setState({
        sortBy:sort_by
      },()=>this._getBooks());
    } else {
      this.setState({
        sortDir:this.state.sortDir === 'asc' ? 'desc' : 'asc'
      },()=>this._getBooks());
    }
  }

  render() {

    let content;

    if(this.state.loading){
      content = <tr><td colSpan="4"><p className="text-center">loading...</p></td></tr>;
    } else {
      content = this.state.books.map((book,index)=>{
              return (<tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td><Link to={"/edit/"+book.id}>Edit Author</Link> | <a href="#" data-id={book.id} data-name={book.title} onClick={this._delete}>Delete</a></td>
              </tr>)
            })
    }

    return (
      <div>
        <Link to={"/add"} className="top-link">Add Book</Link> | <Link to={"/export"} className="top-link">Export Data</Link>
        <div className="search-area">
          <input placeholder="Search by Title/Author" value={this.state.keyword} onChange={(evt)=>{this.setState({keyword:evt.target.value})}} /><button onClick={()=>this._getBooks()}>Search</button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th><a href="#" onClick={()=>{this._sort('title')}}>Title</a></th>
              <th><a href="#" onClick={()=>{this._sort('author')}}>Author</a></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { content }
          </tbody>
        </Table>
      </div>
    );
  }
}
