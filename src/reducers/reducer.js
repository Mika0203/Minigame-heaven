import { CHANGE_ROUTER } from '../Actions/index';
import { combineReducers } from 'redux';

console.log()
const counterInitialState = {
    route: window.location.pathname.split('/')[1],
};

const reducer = (state = counterInitialState, action) => {
    console.log(state, action);
    
    switch(action.type) {
        case CHANGE_ROUTER:
            window.history.pushState('','',action.value);
            return Object.assign({}, state, {
                route: action.value
            });
 
        default:
            return state;
    }
};

export default reducer;