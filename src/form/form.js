import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as formActions from './actions/';

import NameField from './components/nameField';
import BirthdayField from './components/birthdayField';
import GenderField from './components/genderField';
import EmailField from './components/emailField';
import PassField from './components/passField';
import CarAvailability from './components/carAvailability';
import './form.css';

class TestForm extends Component{

  submitForm(e){
    e.preventDefault();
    this.props.formActions.submitData();
  }

  render(){
    const { lastName, firstName, middleName, gender, birthday, pass, email } = this.props.form;
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <NameField id='lastName' name='Фамилия' required={true} actions={this.props.formActions} stateToProps={lastName}/>
        <NameField id='firstName' name='Имя' required={true} actions={this.props.formActions} stateToProps={firstName}/>
        <NameField id='middleName' name='Отчество' required={false} actions={this.props.formActions} stateToProps={middleName}/>
        <GenderField id='gender' name='Пол' required={true} actions={this.props.formActions} stateToProps={gender}/>
        <BirthdayField id='birthday' name='Дата рождения' required={true} actions={this.props.formActions} stateToProps={birthday}/>
        <PassField id='pass' name='Серия и номер паспорта' required={true} actions={this.props.formActions} stateToProps={pass}/>
        <EmailField id='email' name='Email' required={true} actions={this.props.formActions} stateToProps={email}/>
        <CarAvailability id='carAvailability' actions={this.props.formActions} stateToProps={this.props.form}/>

        <button type='submit'>Отправить</button>
      </form>
    )
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    form: store.form
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    formActions: bindActionCreators(formActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TestForm)


