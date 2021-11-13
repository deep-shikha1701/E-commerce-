import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {signout} from '../../actions/auth.actions'


export default function Header(props) {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(signout())
    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <span className='nav-link' onClick={logout} >Sign Out</span>
                </li>
            </Nav>

        )
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                {/* <Nav.Link href="#deets">Sign In</Nav.Link> */}
                <li className='nav-item'>
                    <NavLink to='signin' className='nav-link' >Sign In</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='signup' className='nav-link'>Sign Up</NavLink>
                </li>
            </Nav>
        )
    }


    return (
        <div>
            <Navbar style={{ zIndex: 1 }} collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container fluid    >
                    {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                    <Link className="navbar-brand" to='/'>Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}
