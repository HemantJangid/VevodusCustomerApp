import {ADD_USER, DELETE_USER} from '../actions/types';
const initialState = {
  userDetails: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userDetails: action.data,
      };
    case DELETE_USER:
      return {
        ...state,
        userDetails: {},
      };
    default:
      return state;
  }
};

export default userReducer;
