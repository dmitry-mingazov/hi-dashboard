import GridLayout from 'react-grid-layout';
import React from 'react';
import Widget from './Widget';

import './MainGrid.css';

class MainGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: [
                {id: 1, x: 0, y: 0, w: 2, h: 2, draggableHandle: true},
                {id: 2, x: 3, y: 3, w: 2, h: 2},
                {id: 3, x: 4, y: 5, w: 2, h: 2},
            ]
        }
    }
    render() {
        return (
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                {this.state.widgets.map(w => (
                    <div className="reactGridElement" key={w.id} data-grid={w}>
                        <Widget key={w.id} data-grid={w}>
                            <span>Widget n. {w.id}</span>
                        </Widget>
                    </div> 
                ))}
            </GridLayout>
        )
    }
}

export default MainGrid;