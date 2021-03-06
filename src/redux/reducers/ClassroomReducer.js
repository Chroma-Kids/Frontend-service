import * as types from '../actions/ActionTypes';

const initialState = {
  currentClassroom: undefined,
};

export default function (state = {}, action) {

    const { payload } = action;

    switch (action.type) {
      // Classrooms
      case types.FETCH_CLASSROOMS_PENDING:
        return {
          ...state,
          loading: true
        }
      case types.FETCH_CLASSROOMS_FULFILLED:
        return {
          ...state,
          classrooms: payload,
          loading: false
        }
      // Add Student to Classroom
      case types.ADD_STUDENT_CLASSROOM_PENDING:
        return {
          ...state,
          loading: true
        }
      case types.ADD_STUDENT_CLASSROOM_FULFILLED:
        return {
          ...state,
          loading: false
        }
      // Add Student to Classroom
      case types.REMOVE_STUDENT_CLASSROOM_PENDING:
        return {
          ...state,
          loading: true
        }
      case types.REMOVE_STUDENT_CLASSROOM_FULFILLED:
        return {
          ...state,
          loading: false
        }
      // Classroom
      case types.FETCH_CLASSROOM_PENDING:
        return {
          ...state,
          loading: true,
          currentClassroom: {}
        }
      case types.FETCH_CLASSROOM_FULFILLED:
        return {
          ...state,
          loading: false,
          currentClassroom: payload ? payload : initialState.currentClassroom,
        };
      case types.SAVE_CLASSROOM_FULFILLED:
        return {
          ...state,
          currentClassroom: payload ? payload : initialState.currentClassroom,
        };
      default:
        return state;
    }
}
