import { Map } from 'immutable';

import {
  SET_MENU_ITEMS,
  SET_CURRENT_ITEM,
  SET_CURRENT_USER,
  SET_ERROR,
} from 'actions/app';

const initialState = Map({
  currentItem: 0,
  currentUser: localStorage.getItem('user') || '',
  menuItems: [],
  loginError: false,
});

const actionsMap = {
  [SET_MENU_ITEMS]: (state, action) => {
    return state.merge(Map({
      menuItems: action.data,
    }));
  },

  [SET_CURRENT_USER]: (state, action) => {
    return state.merge(Map({
      currentUser: action.user,
    }));
  },

  [SET_CURRENT_ITEM]: (state, action) => {
    return state.merge(Map({
      currentItem: action.item,
    }));
  },

  [SET_ERROR]: (state, action) => {
    return state.merge(Map({
      loginError: action.flag,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
