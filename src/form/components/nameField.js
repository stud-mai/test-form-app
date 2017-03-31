import React from 'react';

 const NameField = (props) => {
  const {id, name, required, actions, stateToProps} = props
  const { focusSet, focusUnset, changeValue } = actions;
  const { value, error } = stateToProps;
  return (
    <label>
      {required? `${name}*` : name}:&nbsp;
      <input
        id={id}
        type='text'
        className={error? 'error' : ''}
        placeholder={name}
        pattern='^[А-Яа-яЁё]+$'
        value={value}
        onChange={(e) => changeValue(id, e.target.value)}
        onBlur={(e) => focusUnset(id, e.target.value)}
        onFocus={() => focusSet(id)}
        required={required}/>
      {error? <span className='error-msg'>{error}</span> : ''}
    </label>
  )
}

export default NameField;