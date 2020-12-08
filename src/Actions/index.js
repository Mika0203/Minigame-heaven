export const CHANGE_ROUTER = 'CHANGE_ROUTER';

export function ChangeRouter(url){
    return {
        type : CHANGE_ROUTER,
        url : url
    }
}