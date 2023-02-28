import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.css'

const Header = () => {
    return (
        <>
            <Navbar fixed="top" expand="lg" variant='dark' className='navbar'>
                <Container>
                    <Navbar.Brand href="/">Foodido</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/recipes">Recipes</Nav.Link>
                            <NavDropdown title="Other" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                            <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                            {/* <Navbar.Text>
                                Signed in as: <a href="/profile">Username</a>
                            </Navbar.Text>  */}
                            <Nav.Link href="/login">Login</Nav.Link>   
                    </Navbar.Collapse>
                </Container>
            </Navbar>
      </>
    )
}

export default Header;