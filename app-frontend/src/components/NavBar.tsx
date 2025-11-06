import  { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { useNavigate } from 'react-router-dom';

import "../css/navbar.css"
import {AddDeviceModal} from "../authorization/AddDeviceModal.tsx";

export const NavBar = () => {
    const [showAddModal, setShowAddModal] = useState(false);

    const navigate = useNavigate();
    const role = localStorage.getItem('role')
    const handleDeviceAdded = () => {
        setShowAddModal(false);
        navigate('/devices');

    };

    return (
        <div className="app-container">
            <Navbar expand="lg" className="bg-body-tertiary navbar">
                <Container>
                    <Navbar.Brand>Menu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            {role && <Nav.Link href="/admin"> Admin dashboard</Nav.Link> }
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/devices">See Devices</NavDropdown.Item>

                                <NavDropdown.Item onClick={() => setShowAddModal(true)}>
                                    Add devices
                                </NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <AddDeviceModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
                onDeviceAdded={handleDeviceAdded}
            />
        </div>
    );
}
