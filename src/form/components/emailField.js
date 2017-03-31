import React from 'react';

const EmailField = (props) => {
  const { id, name, required, actions, stateToProps } = props
  const { focusSet, focusUnset } = actions;
  const { error } = stateToProps;
  return (
    <label>
      {required? `${name}*` : name}:&nbsp;
      <input
        id={id}
        type='email'
        className={error? 'error' : ''}
        placeholder={name}
        onFocus={() => focusSet(id)}
        onBlur={(e) => focusUnset(id, e.target.value)}
        required={required}/>
      {error? <span className='error-msg'>&nbsp;{error}</span> : ''}
    </label>
  )
}

export default EmailField
