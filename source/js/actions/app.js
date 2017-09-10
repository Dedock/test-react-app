import api from 'api';

export const SET_MENU_ITEMS = 'SET_MENU_ITEMS';
export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_ERROR = 'SET_ERROR';

// Async action example

function setMenuItems(data) {
  return {
    type: SET_MENU_ITEMS,
    data,
  };
}

export function setError(flag) {
  return {
    type: SET_ERROR,
    flag,
  };
}

export function setCurrentItem(item) {
  return {
    type: SET_CURRENT_ITEM,
    item,
  };
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function login(user) {
  return function (dispatch) {
    api.login(user)
      .then(data => dispatch(setMenuItems(data.data)))
      .then(() => dispatch(setCurrentUser(user.user)))
      .then(() => dispatch(setError(false)))
      .catch(err => {
        console.log(err)
        dispatch(setError(true));
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch(setCurrentUser(''));
  };
}

export function setMenuItem(index) {
  return function (dispatch) {
    dispatch(setCurrentItem(index));
  };
}

// Update
