import React from 'react';

import './ShowcaseItem.css';
import Button from '../../UI/Button/Button';

/**
 * Stateless component for rendering each item in showcase.
 * 
 * In props we should receive:
 * 
 * 'name' - a string with item name
 * 'price' - a number with price
 * 'clickHandler' - handler for adding item to cart
 * 
 * @param {name, price, clickHandler} props 
 */
const showcaseItem = (props) => {
    return (
        <div className='ShowcaseItem'>
            <div className='ShowcaseItemInfo'>
                <div>Item name: {props.name}</div>
                <div>Item price: {props.price}$</div>
            </div>
            <Button
                data-name={props.name}
                className='Success'
                clickHandler={props.clickHandler}>Add to cart</Button>
        </div>
    );
};

export default showcaseItem;