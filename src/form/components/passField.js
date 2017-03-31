import React from 'react';
import InputElement from 'react-input-mask';

const PassField = (props) => {
  //console.log(props)
  const { id, name, required, actions, stateToProps } = props
  const { focusSet, focusUnset } = actions;
  const { error } = stateToProps;
  return (
    <label>
      {required? `${name}*` : name}:&nbsp;
      <InputElement
        id={id}
        className={error? 'error' : ''}
        required={required}
        mask='9999 999999'
        placeholder='9999 123456'
        pattern='[0-9]{4} [0-9]{6}'
        onBlur={(e) => focusUnset(id, e.target.value)}
        onFocus={() => focusSet(id)}/>
      {error? <span className='error-msg'>&nbsp;{error}</span> : ''}
    </label>
  )
}

export default PassField
