import React from 'react';

const GenderField = (props) => {
  const {id, name, required, actions, stateToProps} = props
  const { changeValue } = actions;
  const { value } = stateToProps;
  return (
    <label>
      {required? `${name}*` : name}:&nbsp;
      <select
        id={id}
        required={required}
        onChange={(e) => changeValue(id, e.target.value)}
        value={value}>
        <option value='male'>M</option>
        <option value='female'>Ж</option>
      </select>
    </label>
  )
}

export default GenderField;