export const set = (payload) => ({ type: 'SET', payload });

export const show = (payload) => ({ type: 'SHOW', payload });

export const del = () => ({ type: 'DEL' });

export const fetchSwapi = (swapi, toLocalStorage = () => {}, url)  => () => (dispatch) => {
    swapi(url)
        .then( (data) => {
            if (url) {
                dispatch(show(data));
                return
            }
            dispatch(set(data));
            toLocalStorage();
        })
};

// export const fetchSwapiOld = (swapi, toLocalStorage, dispatch)  => () => {
//     swapi()
//         .then( (data) => {
//             dispatch(set(data));
//             toLocalStorage();
//         })
// };

