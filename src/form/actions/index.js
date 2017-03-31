export const focusSet = (id) => {
  return {
    type: 'FOCUS_SET',
    payload: {
      field: id
    }
  }
}

export const focusUnset = (id, value) => {
  return {
    type: 'FOCUS_UNSET',
    payload: {
      field: id,
      value: value
    }
  }
}

export const changeValue = (id, value) => {
  return {
    type: 'CHANGE_VALUE',
    payload: {
      field: id,
      value: value
    }
  }
}

export const submitData = () => {
  return {
    type: 'SUBMIT_DATA'
  }
}