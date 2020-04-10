//import './Navbar.css';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
//import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

export const NavbarBootstrap = () => (
  <Navbar bg='light' expand='lg'>
    <Navbar.Brand href='/home'>React-Bootstrap</Navbar.Brand>
    <Nav className='mr-auto'>
      <Nav.Link href='/home'>Home</Nav.Link>
      <Nav.Link href='/weather'>Weather</Nav.Link>
      <NavDropdown title='Flat' id='nav-dropdown'>
        <NavDropdown.Item href='/flat/monitor'>
          Environment Monitor
        </NavDropdown.Item>
        <NavDropdown.Item href='/flat/plants'>Plants</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href='/about'>About</Nav.Link>
    </Nav>
  </Navbar>
);

export default NavbarBootstrap;
