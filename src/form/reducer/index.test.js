import reducer from './index';
import { initialState } from './index'

test('Initial state test', () => {
  expect(reducer(undefined,'').form).toEqual(initialState);
})

test('Focus unset', () => {
  const action = {
    type:'FOCUS_UNSET',
    payload: {
      field: 'lastName',
      value: ''
    }
  };
  const response = {
    lastName: {
      error: 'Поле обязательно к заполнению!'
    }
  };
  expect(reducer(undefined, action).form).toMatchObject(response);
})

test('Changing value in firstName field', () => {
  const action = {
    type:'CHANGE_VALUE',
    payload: {
      field: 'firstName',
      value: '123'
    }
  };
  const response = {
    firstName: {
      value: ''
    }
  };
  expect(reducer(undefined, action).form).toMatchObject(response);
})

test('Changing value in carAvailability field', () => {
  const action = {
    type:'CHANGE_VALUE',
    payload: {
      field: 'carAvailability',
      value: 'true'
    }
  };
  const response = {
    firstName: {
      value: ''
    }
  };
  expect( reducer(undefined, action).form).toMatchObject(response);
})

test('Birthday field test 1', () => {
  const action = {
    type:'FOCUS_UNSET',
    payload: {
      field: 'birthday',
      value: '12.22.1987'
    }
  };
  const response = {
    birthday: {
      value: '',
      error: 'Дата введена не корректно!'
    }
  };
  expect(reducer(undefined, action).form).toMatchObject(response);
})

test('Birthday field test 2', () => {
  const action = {
    type:'FOCUS_UNSET',
    payload: {
      field: 'birthday',
      value: '12.12.1999'
    }
  };
  const response = {
    birthday: {
      value: '',
      error: 'Извините, но Вы должны быть старше 18 лет!'
    }
  };
  expect(reducer(undefined, action).form).toMatchObject(response);
})

test('Birthday field test 3', () => {
  const action = {
    type:'FOCUS_UNSET',
    payload: {
      field: 'birthday',
      value: '12.12.1989'
    }
  };
  const response = {
    birthday: {
      value: (new Date(1989,11,12)).toLocaleDateString()
    }
  };
  expect(reducer(undefined, action).form).toMatchObject(response);
})

test('Email check', () => {
  const action = {
    type:'FOCUS_UNSET',
    payload: {
      field: 'email',
      value: 'abc@abc'
    }
  };
  const response = {
    email: {
      value: '',
      error: 'Поле заполнено не верно!'
    }
  };
  expect(reducer(undefined, action).form).toMatchObject(response);
})

test('Validation failed 1', () => {
  const action = {
    type:'VALIDATE_DATA'
  };
  const response = {
    pass: {error: 'Поле обязательно к заполнению!'},
    submitting: false
  };
  const filledFields = {
    lastName: {
      value: 'Фамилия',
      required: true,
      error: ''
    },
    firstName: {
      value: 'Имя',
      required: true,
      error: ''
    },
    gender: {
      value: 'male',
      required: true,
      error: ''
    },
    birthday: {
      value: (new Date(1989,11,12)).toLocaleDateString(),
      required: true,
      error: ''
    },
    email: {
      value: 'abc@abc.tt',
      required: true,
      error: ''
    }
  }
  const state = Object.assign({}, initialState, filledFields);
  expect(reducer({form: state}, action).form).toMatchObject(response);
})

test('Validation failed 2', () => {
  const action = {
    type:'VALIDATE_DATA'
  };
  const response = {
    pass: {error: 'Поле обязательно к заполнению!'},
    email: {error: 'Поле заполнено не верно!'},
    submitting: false
  };
  const filledFields = {
    lastName: {
      value: 'Фамилия',
      required: true,
      error: ''
    },
    firstName: {
      value: 'Имя',
      required: true,
      error: ''
    },
    gender: {
      value: 'male',
      required: true,
      error: ''
    },
    birthday: {
      value: (new Date(1989,11,12)).toLocaleDateString(),
      required: true,
      error: ''
    },
    email: {
      value: 'abc@abc',
      required: true,
      error: 'Поле заполнено не верно!'
    }
  }
  const state = Object.assign({}, initialState, filledFields);
  expect(reducer({form: state}, action).form).toMatchObject(response);
})

test('Validation succeed', () => {
  const action = {
    type:'VALIDATE_DATA'
  };
  const response = {
    submitting: true
  };
  const filledFields = {
    lastName: {
      value: 'Фамилия',
      required: true,
      error: ''
    },
    firstName: {
      value: 'Имя',
      required: true,
      error: ''
    },
    gender: {
      value: 'male',
      required: true,
      error: ''
    },
    birthday: {
      value: (new Date(1989,11,12)).toLocaleDateString(),
      required: true,
      error: ''
    },
    email: {
      value: 'abc@abc.tt',
      required: true,
      error: ''
    },
    pass: {
      value: '1234 123546',
      required: true,
      error: ''
    }
  }
  const state = Object.assign({}, initialState, filledFields);
  expect(reducer({form: state}, action).form).toMatchObject(response);
})

test('Submitting data', () => {
  const action = {
    type:'SUBMIT_DATA'
  };
  const filledFields = {
    lastName: {
      value: 'Фамилия',
      required: true,
      error: ''
    },
    firstName: {
      value: 'Имя',
      required: true,
      error: ''
    },
    gender: {
      value: 'male',
      required: true,
      error: ''
    },
    birthday: {
      value: (new Date(1989,11,12)).toLocaleDateString(),
      required: true,
      error: ''
    },
    email: {
      value: 'abc@abc.tt',
      required: true,
      error: ''
    },
    pass: {
      value: '1234 123546',
      required: true,
      error: ''
    },
    submitting: true
  }
  const state = Object.assign({}, initialState, filledFields);
  expect(reducer({form: state},action).form).toEqual(initialState);
})