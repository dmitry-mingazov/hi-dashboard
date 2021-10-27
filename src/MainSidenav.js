import React from "react";
import { Nav, Sidebar, Sidenav, Dropdown } from "rsuite"

class MainSidenav extends React.Component {
    onSelect(eventKey, event) {
        switch(eventKey) {
            case 'add-widget':
                this.props.onAddWidget();
                break;
            case 'remove-widget':
                this.props.onRemoveWidget();
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
                                onSelect={(eventKey, event) => this.onSelect(eventKey, event)}
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