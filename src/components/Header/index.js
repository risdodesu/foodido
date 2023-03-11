import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import { Link } from 'react-router-dom';
import {GiMeal} from 'react-icons/gi'

const BASE_URL = process.env.REACT_APP_FOOD_BASEURL;
const API_KEY = process.env.REACT_APP_FOOD_APIKEY;

const Header = () => {

    const [username, setUsername] = useState();
    const JWT_TOKEN = localStorage.getItem('token');

    useEffect(() => {
        if(JWT_TOKEN){
            axios({
                method: 'get',
                url: `${BASE_URL}/api/v1/user`,
                headers: {
                    Authorization: `Bearer ${JWT_TOKEN}`,
                    apiKey: `${API_KEY}`
                }
            })
            .then(function(response){
                setUsername(response.data.user.name);
            })
        }
    },[JWT_TOKEN]);

    const handleLogout = () => {

        if (window.confirm('Apakah anda yakin ingin keluar?'))

        axios({
            method: 'get',
            url: `${BASE_URL}/api/v1/logout`,
            headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
                apiKey: `${API_KEY}`,
            }
            })
            .then((response) => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("role");

                window.location.assign('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Navbar fixed="top" expand="lg" variant="dark" className="navbar">
                <Container>
                    <Navbar.Brand className='title' href="/">Foodid<GiMeal/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {localStorage.getItem("role") === "admin" ? (
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            ) : <Nav.Link href="/">Home</Nav.Link> }      
                            <Nav.Link href="/recipes">Recipes</Nav.Link>
                            {localStorage.getItem("role") === "user" ? (
                                <Nav.Link href="/favourite">My Favourite</Nav.Link>
                            ) : null }
                            {localStorage.getItem("role") === "admin" ? (
                                <Nav.Link href="/users">All Users</Nav.Link>
                            ) :  
                                <NavDropdown title="Other" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about">About Us</NavDropdown.Item>
                                <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
                                {localStorage.getItem("role") === "user" ? (
                                    <Link onClick={() => handleLogout()} className='dropdown-item'>Log Out</Link>
                                ) : null }
                                </NavDropdown>
                            }
                            {localStorage.getItem("role") === "admin" ? (
                                 <Nav.Link onClick={() => handleLogout()}>Log Out</Nav.Link>
                            ) : null }
                        </Nav>
                        {localStorage.getItem("username") ? (
                        <Navbar.Text>
                            Signed in as: <a href="/profile">{username}</a>
                        </Navbar.Text> 
                        ) : <Nav.Link href="/login">Login</Nav.Link> }
                               
                    </Navbar.Collapse>
                </Container>
            </Navbar>
      </>
    )
}

export default Header;