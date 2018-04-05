import React from 'react';

import './Showcase.css';
import ShowcaseItem from './ShowcaseItem/ShowcaseItem';
import Button from '../UI/Button/Button';

/**
 * Stateless component for rendering our showcase.
 * It uses <ShowcaseItem /> for drawing each item
 * and <Button /> for drawing buttons
 * 
 * In props we should receive:
 *  
 * 'goods': an array with goods we want to render
 * 'addItemToCartHandler': handler for adding items to the cart.
 * 'fillCartRandomlyHandler': click handler for random filling the cart
 * 'clearCartHandler': click handler to clear the cart
 * 
 * @param {goods, addItemToCartHandler, fillCartRandomlyHandler, clearCartHandler} props 
 */
const showcase = (props) => {
    let goods = <p>No goods found</p>;

    if (props.goods) {
        goods = props.goods.map(item => {
            return <ShowcaseItem
                key={item.name}
                name={item.name}
                price={item.price}
                clickHandler={props.addItemToCartHandler} />
        });
    }

    return (
        <div className='Showcase'>
            <div className='ShowcaseItems'>
                {goods}
            </div>
            <Button
                className='Success'
                clickHandler={props.fillCartRandomlyHandler}>Fill the cart randomly</Button>
            <Button
                className='Danger'
                clickHandler={props.clearCartHandler}>Clear cart</Button>
            <hr />
        </div>
    );
}

export default showcase;