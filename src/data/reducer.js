import {C} from './action'
import initialState from './initialState';

const reducer = (state=initialState, action) => {
    switch (action.type){
        case C.ACTION_CHANGE_ACCOUNT:
            return {
                    ...state, 
                    login: action.login
                }
        case C.ACTION_ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        username: action.username,
                        message: action.message,
                        date: action.date
                    }
                ]
            }
        case C.ACTION_DELETE_ACCOUNT:
            return state = initialState
        case C.ACTION_ADD_ERROR:
            return {
                ...state,
                error: action.message
            }
        case C.ACTION_DELETE_ERROR:
            return {
                ...state,
                error: ''
            }
        case C.ACTION_EDIT_CLIENTS:
            return {
                ...state,
                clients: action.clients
            }
        case C.ACTION_ADD_IP:
            return {
                ...state,
                ip_address: action.ip_address
            }
        case C.ACTION_AUTH:
            return {
                ...state,
                isAuth: action.auth
            }
        default:
            return state
    }
}

export default reducer