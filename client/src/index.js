import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Container,  Nav, NavDropdown, Navbar } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import CreateProjectForm from './pages/createProject';

function CustomNavbar() {
  return (
    <Navbar expand="lg" sticky="top" bg="dark" variant='dark' className='mb-2'>
      <Container >
        <LinkContainer to="/">
          <Navbar.Brand>Issue Tracker</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse id= "basic-navbar-nav">
          <Nav>
            <LinkContainer to="/search">
              <Nav.Link>Search issue</Nav.Link>
            </LinkContainer>
            <NavDropdown
              title="Add new project"
              menuVariant="dark"
            >
              <CreateProjectForm/>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomNavbar />
      <AppRoutes />
      <footer id="footer" className="fixed-bottom mt-3 py-2 bg-dark text-white-50">
          <Container className="text-start">
              Salvador Ochoa, 2023
          </Container>
      </footer>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
