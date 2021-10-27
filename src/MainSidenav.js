import React from "react";
import { Nav, Sidebar, Sidenav, Dropdown } from "rsuite"

class MainSidenav extends React.Component {
    onSelect(eventKey, event) {
        switch(eventKey) {
            case 'add-widget':
                console.log('add widget');
                break;
            case 'remove-widget':
                console.log('remove-widget');
                break;
            case 'save-dashboard':
                console.log('save-dashboard');
                break;
        }
    }

    render() {
        return (
            <Sidebar>
                <Sidenav >
                    <Sidenav.Body>
                        <Nav>
                            <Dropdown
                                eventKey="3"
                                title="Actions"
                                placement="rightStart"
                                onSelect={this.onSelect}
                                >
                                <Dropdown.Item eventKey="add-widget">Add Widget</Dropdown.Item>
                                <Dropdown.Item eventKey="remove-widget">Remove random</Dropdown.Item>
                                <Dropdown.Item eventKey="save-dashboard">Save Dashboard</Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </Sidebar>
        )
    }
}

export default MainSidenav;