import * as actionTypes from '../actions/actionTypes';

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const initialState = {
    token: null,
    user: null,
    role: "guest",
    cart: [  ]
};

const authSuccess = (state, action) => {
    return updateObject( state, { 
        token: action.token,
        user: action.user,
        role: action.role
    } );
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, user: null, role: "guest", cart: [] });
};

const addItemToCart = (state, action) => {
    return updateObject(state, { cart: action.products });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.ADD_ITEM: return addItemToCart(state, action);
        default:
            return state;
    }
};

export default reducer;