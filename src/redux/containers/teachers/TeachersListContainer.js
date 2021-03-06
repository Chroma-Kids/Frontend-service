import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { getTeachers, createTeacher, deleteTeacher, removeTeachersListener } from '../../actions/TeacherActions';
import TeachersList from '../../../views/teachers/TeachersList';

export class TeachersListContainer extends Component {

    componentDidMount(){
      this.props.getTeachers();
    }

    componentWillUnmount(){
      this.props.removeTeachersListener();
    }

    render() {
      return (
        <div>
            <TeachersList {...this.props} />
        </div>
      )
    }
}

const mapStateToProps = (state, ownProps)=> {
    return {
        teachers: state.teachers.teachers,
    }
}

const mapDispatchToProps = (dispatch, state)=> {
    return bindActionCreators({ getTeachers, createTeacher, deleteTeacher, removeTeachersListener }, dispatch);
}

let newStudentForm = reduxForm({
    form: 'NewTeacher'
})(TeachersListContainer);

export default connect(mapStateToProps, mapDispatchToProps)(newStudentForm);
