import React from 'react';

import './Button.css';

/**
 * Stateless component for rendering button.
 * 
 * We should receive in props:
 * 'className' - string with a button class
 * 'clickHandler' - handler of the click
 * 'children' - will be passed as button content
 * 
 * optional:
 * 'data-*' - attributes for passing data
 * 
 * @param {className, clickHandler, children} props 
 */
const button = (props) => {
    const className = ['Button'];
    const dataAttrs = {};

    if (props.className) {
        className.push(props.className);
    }

    for (let propName in props) {
        if (propName.startsWith('data-')) {
            dataAttrs[propName] = props[propName];
        }
    }

    return (
        <button
            {...dataAttrs}
            className={className.join(' ')}
            onClick={props.clickHandler}>{props.children}</button>
    );
};

export default button;