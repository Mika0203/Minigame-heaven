import { CHANGE_ROUTER } from '../Actions/index';

const counterInitialState = {
    router: window.location.pathname.split('/')[1],
};

const reducer = (state = counterInitialState, action) => {
    console.log(state, action);
    
    switch(action.type) {
        case CHANGE_ROUTER:
            window.history.pushState('','',action.router);
            return Object.assign({}, state, {
                router: action.router
            });
 
        default:
            return state;
    }
};

export default reducer;