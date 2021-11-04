import { Container, Content, } from 'rsuite';
import React, { useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import MainGrid from './MainGrid';
import MainSidenav from './MainSidenav';

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

class MainContent extends React.Component {
    static contextType = UserContext;

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
        // set the author of the dashboard
        const { user } = this.context;
        this.setState({author: user.sub});

        axios.get(process.env.REACT_APP_API_URL + '/dashboard').then((response) => {
            const dashboards = response.data;
            if (!dashboards.length) {
                console.log(`No dashboards found for ${this.state.author}`);
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
        const author = this.state.author;
        const url = process.env.REACT_APP_API_URL + '/dashboard';
        const updateUrl = url + '/' + this.state.currDashboardId;
        const payload = {author, widgets: this.state.widgets.map(widgetToDto)};
        const updatePayload = {author, widgets: this.state.widgets.map(widgetToDto), id: this.state.currDashboardId};
        const req = this.state.currDashboardId ? axios.put(updateUrl, updatePayload) : axios.post(url, payload);
        req.then(response => {
                console.log('Dashboard saved!');
            });
    }

    render() {
        return (
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
        )
    }
}
export default MainContent;