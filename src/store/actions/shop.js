import * as actionTypes from './actionTypes';

export const fetchGoods = (goods) => {
    return {
        type: actionTypes.FETCH_GOODS,
        goods: goods
    };
};

export const restoreCartItems = () => {
    return {
        type: actionTypes.RESTORE_CART_ITEMS
    };
};

export const initGoods = () => {
    return dispatch => {
        fetch('goods-mock.json')
            .then(resp => resp.json())
            .then(respJson => {
                dispatch(fetchGoods(respJson.goods));
            });
    };
};

export const addItemToCart = (item) => {
    return {
        type: actionTypes.ADD_ITEM_TO_CART,
        item: item
    };
};

export const removeItemFromCart = (item) => {
    return {
        type: actionTypes.REMOVE_ITEM_FROM_CART,
        item: item
    };
};

export const removeAllItemsByName = (name) => {
    return {
        type: actionTypes.REMOVE_ITEMS_FROM_CART_BY_NAME,
        name: name
    };
};

export const clearCart = () => {
    return {
        type: actionTypes.CLEAR_CART
    };
};