import React from 'react';

const Widget = React.forwardRef(({style, className, ...props}, ref) => {
    return (
        <div style={{...style}} className={className} ref={ref}>
            {props.children}
        </div>
    )
}) ;

export default Widget;