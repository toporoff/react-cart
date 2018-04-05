import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    goods: null,
    cartItems: null
};

const fetchGoods = (state, action) => {
    return updateObject(state, { goods: action.goods });
};

const restoreCartItems = (state, action) => {
    const storedCartItems = localStorage.getItem('cartItems');
    let cartItems = null;

    if(storedCartItems){
        cartItems = JSON.parse(storedCartItems);
    }

    return updateObject(state, { cartItems: cartItems });
}

const addItemToCart = (state, action) => {
    const cartItems = state.cartItems ? [...state.cartItems] : [];
    let cartItem = cartItems.find(item => item.name === action.item.name);

    if (cartItem) {
        cartItems.map(item => {
            if (item.name === cartItem.name) {
                item.qty++;
            }

            return item;
        });
    } else {
        cartItem = updateObject(action.item, { qty: 1 });
        cartItems.push(cartItem);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return updateObject(state, { cartItems: cartItems });
};

const removeItemFromCart = (state, action) => {
    let cartItems = [...state.cartItems];

    if(action.item.qty > 1) {
        cartItems.map(item => {
            if(item.name === action.item.name) {
                item.qty--;
            }

            return item;
        });
    } else {
        cartItems = cartItems.filter(item => item.name !== action.item.name);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return updateObject(state, { cartItems: cartItems });
};

const removeAllItemsByName = (state, action) => {
    const cartItems = [...state.cartItems].filter(item => item.name !== action.name);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return updateObject(state, { cartItems: cartItems });
};

const clearCart = (state, action) => {
    localStorage.removeItem('cartItems');
    return updateObject(state, { cartItems: null });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GOODS: return fetchGoods(state, action);
        case actionTypes.ADD_ITEM_TO_CART: return addItemToCart(state, action);
        case actionTypes.REMOVE_ITEM_FROM_CART: return removeItemFromCart(state, action);
        case actionTypes.REMOVE_ITEMS_FROM_CART_BY_NAME: return removeAllItemsByName(state, action);
        case actionTypes.CLEAR_CART: return clearCart(state, action);
        case actionTypes.RESTORE_CART_ITEMS: return restoreCartItems(state, action);
        default: return state;
    }
};

export default reducer;