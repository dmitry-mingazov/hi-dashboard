import GridLayout from 'react-grid-layout';
import React from 'react';
import Widget from './Widget';

import './MainGrid.css';

class MainGrid extends React.Component {
    render() {
        return (
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                {this.props.widgets.map(w => (
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