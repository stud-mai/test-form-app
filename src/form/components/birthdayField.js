import React from 'react';
import InputElement from 'react-input-mask';

const BirthdayField = (props) => {
  const {id, name, required, actions, stateToProps} = props
  const { focusUnset } = actions;
  const { error } = stateToProps;
  const isChrome = window.navigator.userAgent.indexOf('Chrome') !== -1;
  return (
    <label>
      {required? `${name}*` : name}:&nbsp;
      {isChrome?
        <input
          type='date'
          id={id}
          className={error? 'error' : ''}
          required={required}
          mask='99.99.9999'
          onBlur={(e) => focusUnset(id, e.target.value)}/>
      :
        <InputElement
          id={id}
          className={error? 'error' : ''}
          required={required}
          mask='99.99.9999'
          placeholder='дд.мм.гггг'
          pattern='[0-9]{2}\.[0-9]{2}\.[0-9]{4}'
          onBlur={(e) => focusUnset(id, e.target.value)}/>
        }
      {error? <span className='error-msg'>&nbsp;{error}</span> : ''}
    </label>
  )
}

export default BirthdayField;