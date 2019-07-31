import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_MEETING':
      return { ...state, [action.payload.id]: action.payload };
    case 'FETCH_MEETING':
      return { ...state, [action.payload.id]: action.payload };
    case 'FETCH_MEETINGS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'DELETE_MEETING':
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
