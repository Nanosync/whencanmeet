import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_ERROR':
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
