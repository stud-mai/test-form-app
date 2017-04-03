import { combineReducers } from 'redux';

export const initialState = {
  'lastName': {value:'', required: true},
  'firstName': {value:'', required: true},
  'middleName': {value:''},
  'gender': {value:'male', required: true},
  'email': {value:'', required: true},
  'pass': {value:'', required: true},
  'birthday': {value:'', required: true},
  'carAvailability': {value: false},
  'carBrand': {value: ''},
  'carModel': {value: ''}
}

const regExpCheck = (field, value) => {
  let regexp;
  switch (field){
    case 'email':
      regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case 'pass':
      regexp = /[0-9]{4} [0-9]{6}/;
      break;
    default:
      regexp = /^[А-Яа-яЁё]+$/;
      break;
  }
  return regexp.test(value)
}

const formReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type){
    case 'FOCUS_SET':
      newState[action.payload.field] = {...newState[action.payload.field], error: ''};
      return newState

    case 'FOCUS_UNSET':
      if (action.payload.field === 'birthday'){
        const date = action.payload.value;
        let dateArray, bd, age;

        newState[action.payload.field] = {...newState[action.payload.field], value: '' , error: 'Поле обязательно к заполнению!'};
        if (!date) return newState;

        if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
          dateArray = date.split('-');
        } else {
          dateArray = date.split('.').reverse();
          if ((isNaN(+dateArray[2]) || +dateArray[2] > 31 || +dateArray[2] < 1) ||
              (isNaN(+dateArray[1]) || +dateArray[1] > 12 || +dateArray[1] < 1) ||
              isNaN(+dateArray[0])){
            newState[action.payload.field] = {...newState[action.payload.field], value: '' , error: 'Дата введена не корректно!'};
            return newState
          }
        }

        bd = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        age = Math.floor((Date.now() - bd.getTime()) / 31536000000);

        if (age < 18){
          newState[action.payload.field] = {...newState[action.payload.field], value: '', error: 'Извините, но Вы должны быть старше 18 лет!'};
        } else {
          newState[action.payload.field] = {...newState[action.payload.field], value: bd.toLocaleDateString(), error: ''};
        }
        return newState
      } else {
          if (regExpCheck(action.payload.field, action.payload.value)){
            newState[action.payload.field] = {...newState[action.payload.field], value: action.payload.value, error: ''};
            return newState
          } else if (!action.payload.value && state[action.payload.field].required) {
            newState[action.payload.field] = {...newState[action.payload.field], value: action.payload.value, error: 'Поле обязательно к заполнению!'};
            return newState
          } else if (action.payload.value) {
            newState[action.payload.field] = {...newState[action.payload.field], value: '', error: 'Поле заполнено не верно!'};
            return newState
          } else {
            return state
          }
      }
    case 'CHANGE_VALUE':
      switch(action.payload.field){
        case 'lastName':
        case 'firstName':
        case 'middleName':
        case 'email':
        case 'pass':
          if (regExpCheck(action.payload.field, action.payload.value) || action.payload.value === ''){
            newState[action.payload.field] = {...newState[action.payload.field], value: action.payload.value , error: ''};
            return newState
          } else {
            return state
          }
        case 'gender':
        case 'carAvailability':
        case 'carBrand':
        case 'carModel':
          newState[action.payload.field] = {...newState[action.payload.field], value: action.payload.value};
          return newState;
        default:
          return state
      }
    case 'VALIDATE_DATA':
      const errorFields = Object.keys(state).filter(key => (!state[key].value && state[key].required) || state[key].error);
      if (errorFields.length){
        for (let index in errorFields){
          let field = errorFields[index];
          if (!state[field].error){
            newState[field] = {...newState[field], error: 'Поле обязательно к заполнению!'};
          }
        }
        return {...newState, submitting: false}
      } else {
        return {...state, submitting: true}
      }
    case 'SUBMIT_DATA':
      if (state.submitting){
        let json = {};
        Object.keys(state).forEach(key => {
          json = {...json, [key]: state[key].value}
        })
        alert('Данные сохранены!\n' + JSON.stringify(json, null, 2));
        setTimeout(() => action.payload.reset(), 0);
        return initialState
      } else {
        return state
      }
    default:
      return state
  }
}

export default combineReducers({
  form: formReducer
})