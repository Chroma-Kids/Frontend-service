import { database } from '../../firebase'
import * as types from './ActionTypes';


export const removeStudentsListener = () => {
  return dispatch => {
    dispatch({
      type: types.STUDENTS_CLEANED,
      payload: database().child('/students/').off()
    });
  }
}

export const getStudents = () => {
  return dispatch => {
    dispatch({
      type: types.FETCH_STUDENTS_PENDING
    });
    database().child('/students/').on('value', snapshot => {
      dispatch({
        type: types.FETCH_STUDENTS_FULFILLED,
        payload: snapshot.val()
      });
    }, () => {
      dispatch({
        type: types.FETCH_STUDENTS_REJECTED
      });
    });
  };
}

export const fetchStudent = (uid) => {
  return dispatch => {
    dispatch({
      type: types.FETCH_STUDENT_PENDING
    });

    database().child('/students/').child(uid).once('value', function (snapshot, error) {
      if (error)
        dispatch({
          type: types.FETCH_STUDENT_REJECTED,
          payload: error
        });
      else
        dispatch({
          type: types.FETCH_STUDENT_FULFILLED,
          payload: snapshot.val()
        });
    });
  };
}

export const createStudent = (student) => {

  student.created_at = new Date().getTime()/1000;

  return dispatch => {
    dispatch({
      type: types.CREATE_STUDENT_PENDING
    });

    database().child('/students/').push({ ...student }, function(error) {
      if (error)
        dispatch({
          type: types.CREATE_STUDENT_REJECTED,
          payload: error
        });
      else
        dispatch({
          type: types.CREATE_STUDENT_FULFILLED
        });
    })
  };
}

export const deleteStudent = (uid) => {
  return dispatch => {
    dispatch({ type: types.DELETE_STUDENT_PENDING });
    database().child(`/students/${uid}/classrooms`).once('value', (snapshot) => {
      const classrooms = Object.keys(snapshot.val() || {});
      classrooms.forEach((key) => {
        database().child('/classrooms/').child(key).child('students').child(uid).remove();
      });
    }).then(() => {
      database().child('/students/').child(uid).remove()
        .then(function() {
          dispatch({ type: types.DELETE_STUDENT_FULFILLED });
        })
        .catch(function(error) {
          dispatch({
            type: types.DELETE_STUDENT_REJECTED,
            payload: error
          });
        });
    });
  };
}

export const updateStudent = (student, uid) => {

  student.updated_at = new Date().getTime()/1000;

  return dispatch => {
    dispatch({
      type: types.SAVE_STUDENT_PENDING
    });

    database().child(`/students/${uid}`).set({...student}, function (error) {
      if (error)
        dispatch({
          type: types.SAVE_STUDENT_REJECTED,
          payload: error
        });
      else
        dispatch({
          type: types.SAVE_STUDENT_FULFILLED,
          payload: student
        });

    });
  };
}
