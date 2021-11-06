import {
    ADD_USER,
    DELETE_USER,
  } from "./types";
  
  export const addUser = (data) => {
    console.log("add user is called: ", data);
    return (dispatch) => {
      return dispatch({ type: ADD_USER, data: data });
    };
  };
  
  export const deleteUser = (data) => {
    return (dispatch) => {
      return dispatch({ type: DELETE_USER, data: data });
    };
  };