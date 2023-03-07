import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react";
import { Container,  Nav, Navbar } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import {LinkContainer} from "react-router-bootstrap"

import GetIssueForm from "./pages/search.js"
import IssueCards from './pages/index.js';
import UpdateIssueForm from './pages/update.js';
import DeleteIssueForm from './pages/delete.js';
import CreateIssueForm from './pages/create.js';
import IssueList from "./pages/issueList.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Navbar expand="lg" sticky="top" bg="dark" variant='dark' className='mb-3'>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Issue Tracker</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav'/>
              <Navbar.Collapse id= "basic-navbar-nav">
                <Nav>
                  <LinkContainer to="/search">
                    <Nav.Link>Search</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={<IssueCards />} />
          <Route path='/search' element={<GetIssueForm/>}/>
          <Route path='/update' element={<UpdateIssueForm/>}/>
          <Route path='/delete' element={<DeleteIssueForm/>}/>
          <Route path='/create' element={<CreateIssueForm/>}/>
          <Route path='/see-issues' element={<IssueList />}/>
        </Routes>
      </>
    )
  }
}


export default App;
