import React, { useContext } from 'react';
import { Dropdown, Nav, Navbar } from "rsuite";
import LoginButton from "./LoginButton";
import LogoutButton from './LogoutButton';
import { UserContext } from './UserContext';

const MainHeader = () => {
    const { user, isAuthenticated, isLoading } = useContext(UserContext);

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