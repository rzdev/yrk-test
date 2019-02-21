import React, { Component } from 'react';
import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Export from "./pages/Export";

class App extends Component {

  render() {

    return (
      <Container className="paper">
        <Row>
          <Col>
            <h1>Book Management</h1>
            <Router basename="/book">
              <div>
                <Route exact path="/" component={List} />
                <Route path="/add" component={Add} />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/export" component={Export} />
              </div>
            </Router>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
