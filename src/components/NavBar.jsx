import React, { useContext } from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Ecom } from '../context/Api';
import { BsCart4 } from 'react-icons/bs';

function NavBar() {
  const { newItem, filterItems, handleSearch } = useContext(Ecom);

  return (
    <Navbar bg="light" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand> {/* Link to homepage */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {newItem.map((category, index) => (
              <Nav.Link key={index} onClick={() => filterItems(category)}>
                {category}
              </Nav.Link>
            ))}
            <Nav.Link onClick={() => filterItems('')}>All</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Form>
          <Nav.Link as={Link} to="/cart"> {/* Link to cart page */}
           <BsCart4  size={40}/>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
