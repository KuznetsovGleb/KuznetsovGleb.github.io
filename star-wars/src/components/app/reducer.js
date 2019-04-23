const initialState = {
    itemList: null,
    itemPage: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET':
            return Object.assign( {}, state, {itemList: action.payload} );
        case 'SHOW':
            return Object.assign( {}, state, {itemPage: action.payload} );
        case 'DEL':
            return initialState;

        default:
            return state;
    }

};

export default reducer;