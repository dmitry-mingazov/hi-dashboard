import { Container, Content, Footer, Header, Sidebar } from 'rsuite';

import './Main.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import MainGrid from './MainGrid';
import MainSidenav from './MainSidenav';
import React from 'react';
import axios from 'axios';
const widgetToDto = (widget) => {
    return {
        id: widget.id,
        x: widget.x,
        y: widget.y,
        width: widget.w,
        height: widget.h,
    }
}

const widgetFromDto = (dto) => {
    return {
        id: dto.id,
        x: dto.x,
        y: dto.y,
        w: dto.width,
        h: dto.height
    }
}


class Main extends React.Component {
    constructor(props) {
        super(props);

        if (!process.env.REACT_APP_API_URL) {
            console.error('Cannot read REACT_APP_API_URL\nPlease provide a valid .env file');
        }

        this.state = {
            currDashboardId: undefined,
            author: '',
            widgets: [],
            currId: 0
        }
    }


    componentDidMount() {
        // authentication not implemented yet
        const USER = 'dmitry-mingazov';
        axios.get(process.env.REACT_APP_API_URL + '/dashboard/of/' + USER).then((response) => {
            const dashboards = response.data;
            if (!dashboards.length) {
                console.log('No dashboards found for ' + USER);
                return;
            }
            let currId = this.state.currId;
            const defaultDashboard = dashboards[0];
            const currDashboardId = defaultDashboard.id;
            const widgets = defaultDashboard.widgets
                            .map(widgetFromDto)
                            .map(w => {w.id = ++currId; return w;});
            this.setState({currDashboardId, widgets, currId});
        });
    }

    onLayoutChange(layout) {
        this.setState({widgets: layout.map(w => {w.id = w.i; return w;})});
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

    saveDashboard() {
        const author = 'dmitry-mingazov';
        const url = process.env.REACT_APP_API_URL + '/dashboard';
        const updateUrl = url + '/' + this.state.currDashboardId;
        const payload = {author, widgets: this.state.widgets.map(widgetToDto)};
        const updatePayload = {author, widgets: this.state.widgets.map(widgetToDto), id: this.state.currDashboardId};
        const req = this.state.currDashboardId ? axios.put(updateUrl, updatePayload) : axios.post(url, payload);
        req.then(response => {
                console.log('Dashboard saved!');
            })
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
                                <MainGrid 
                                    widgets={this.state.widgets}
                                    onLayoutChange={(layout) => {this.onLayoutChange(layout)}}
                                    />
                            </Content>
                            <MainSidenav 
                                className="mainSidebar"
                                onAddWidget={() => this.addWidget()}
                                onRemoveWidget={() => this.removeWidget()}
                                onSaveDashboard={() => this.saveDashboard()}
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