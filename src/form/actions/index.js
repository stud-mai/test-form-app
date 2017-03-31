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

export const submitData = (form) => {
  return (dispatch) => {
    dispatch({type: 'VALIDATE_DATA'});

    setTimeout(() => {
      dispatch({
        type: 'SUBMIT_DATA',
        payload: form
      })
    }, 1500);
  }
}
