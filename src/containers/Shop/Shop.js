import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxilery/Auxilery";
import Showcase from "../../components/Showcase/Showcase";
import Cart from "../../components/Cart/Cart";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";

/**
 * Statuful component for the entire shop which uses
 * <Showcase /> and <Cart /> components.
 * 
 * Redux is also used in this component as a storage.
 */
export class Shop extends Component {
    componentDidMount() {
        this.props.initGoods();
        this.props.restoreCartItems();
    }

    addItemToCartHandler = (event) => {
        const itemName = event.target.dataset.name;
        const item = this.props.goods.find(item => item.name === itemName);

        this.props.addItemToCart(item);
    }

    removeItemFromCartHandler = (event) => {
        const itemName = event.target.dataset.name;
        const item = this.props.cartItems.find(item => item.name === itemName);

        this.props.removeItemFromCart(item);
    }

    removeItemsFromCartByNameHandler = (event) => {
        const itemName = event.target.dataset.name;

        this.props.removeAllItemsByName(itemName);
    }

    fillCartRandomlyHandler = () => {
        const itemsCount = Math.floor(Math.random() * 10) + 1;

        this.props.clearCart();
        for (let i = 0; i < itemsCount; i++) {
            const itemPos = Math.floor(Math.random() * this.props.goods.length);
            this.props.addItemToCart(this.props.goods[itemPos]);
        }
    }

    clearCartHandler = () => {
        this.props.clearCart();
    }

    prepareCartTableData() {
        const tableData = this.props.cartItems ? [...this.props.cartItems] : [];
        const columns = {
            "name": {
                displayContent: "Name",
                sortable: true
            },
            "price": {
                displayContent: "Price",
                sortable: true
            },
            "qty": {
                displayContent: "Q'ty",
                sortable: true
            },
            "actions": {
                displayContent: "Actions"
            }
        };
        const rows = tableData.map(item => {
            const newItem = {...item};
            newItem.actions = (
                <Aux>
                    <Button
                        className='Danger'
                        data-name={item.name}
                        clickHandler={this.removeItemFromCartHandler}>Remove item</Button>
                    <Button
                        className='Danger'
                        data-name={item.name}
                        clickHandler={this.removeItemsFromCartByNameHandler}>Remove all items</Button>
                </Aux>
            );
            return newItem;
        });

        return {
            columns: columns,
            rows: rows
        };
    }

    render() {
        return (
            <Aux>
                <Showcase
                    goods={this.props.goods}
                    addItemToCartHandler={this.addItemToCartHandler}
                    fillCartRandomlyHandler={this.fillCartRandomlyHandler}
                    clearCartHandler={this.clearCartHandler} />
                <Cart tableData={this.prepareCartTableData()} />
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        goods: state.shop.goods,
        cartItems: state.shop.cartItems
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initGoods: () => dispatch(actions.initGoods()),
        addItemToCart: (item) => dispatch(actions.addItemToCart(item)),
        removeItemFromCart: (item) => dispatch(actions.removeItemFromCart(item)),
        removeAllItemsByName: (name) => dispatch(actions.removeAllItemsByName(name)),
        clearCart: () => dispatch(actions.clearCart()),
        restoreCartItems: () => dispatch(actions.restoreCartItems())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);