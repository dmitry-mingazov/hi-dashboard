import { Container, Content, Footer, Header, Sidebar } from 'rsuite';

import './Main.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import MainGrid from './MainGrid';
import MainSidenav from './MainSidenav';
import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: [
                {id: 1, x: 0, y: 0, w: 2, h: 2},
                {id: 2, x: 3, y: 3, w: 2, h: 2},
                {id: 3, x: 4, y: 5, w: 2, h: 2},
            ],
            currId: 4
        }
    }

    addWidget() {
        const widgets = this.state.widgets;
        let currId = this.state.currId;
        widgets.push({id: ++currId, x: 0, y: 8, w:1, h:1});
        this.setState({widgets, currId});
    }

    removeWidget() {
        const widgets = this.state.widgets;
        let currId = this.state.currId - 1;
        if (currId < 1) {currId = 1;}
        widgets.pop();
        this.setState({widgets, currId})
    }

    render() {
        return(
            <div>
                <Container className="mainContainer">
                    <Container>
                        <Header className="mainHeader">
                            <h4>Hi-Dashboard</h4>
                        </Header>
                        <Container>
                            <Content className="mainContent">
                                Main Content
                                <MainGrid widgets={this.state.widgets}/>
                            </Content>
                            <MainSidenav 
                                className="mainSidebar"
                                onAddWidget={() => this.addWidget()}
                                onRemoveWidget={() => this.removeWidget()}
                                >Sidebar</MainSidenav>
                        </Container>
                        <Footer className="mainFooter">
                            <h4>Footer</h4>
                        </Footer>
                    </Container>
                </Container>
            </div>
        );
    }
}

export default Main;