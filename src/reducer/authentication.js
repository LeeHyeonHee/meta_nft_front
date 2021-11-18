import axios from "axios";
import * as types from '../action/ActionTypes';

const initialState = {
    login: {
        status: 'INIT'
    },
    status: {
        isLoggedIn: false
    }
};

export default function authentication(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_LOGIN:
        return {
          ...state,
          login : {
            status: 'WAITING'
          }
        }
    case types.AUTH_LOGIN_SUCCESS:
        return {
          ...state,
          login: {
              status: 'SUCCESS'
          },
          status: {
            ...state.status,
            isLoggedIn: true,
            currentUser: action.username
          }
        }
    case types.AUTH_LOGIN_FAILURE:
        return {
          ...state,
          login:{
            status: 'FAILURE'
          }
        }
        default:
            break;
    }
}
