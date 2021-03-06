import * as types from '../actions/ActionTypes';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {
    case types.FETCH_STUDENTS_FULFILLED:
      return {
        ...state,
        students: action.payload
      };
    case types.FETCH_STUDENT_FULFILLED:
      return {
        ...state,
        currentStudent: payload,
      };
    default:
      return state;
  }
}
