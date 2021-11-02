import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Dropdown, Nav, Navbar } from "rsuite";
import LoginButton from "./LoginButton";
import LogoutButton from './LogoutButton';

const MainHeader = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    let AuthButton;

    if (isLoading) {
        AuthButton = (
            <Nav.Item>
                Loading ...
            </Nav.Item>
        )
    } else if (isAuthenticated) {
        AuthButton = (
            <Dropdown title={user.name}>
                <Dropdown.Item><LogoutButton /></Dropdown.Item>
            </Dropdown>
        )
    } else {
        AuthButton = (
            <Nav.Item>
                <LoginButton />
            </Nav.Item> 
        )
    }

    return (
            <Navbar>
                <Navbar.Brand>
                    Hi-Dashboard
                </Navbar.Brand>
                <Nav pullRight>
                    {AuthButton}
                </Nav>
            </Navbar>
        )
};

export default MainHeader;