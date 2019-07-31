import meeting from '../apis/meeting';

export const createMeeting = (formValues, history) => async (dispatch) => {
  const response = await meeting.post('/meeting', formValues);
  dispatch({ type: 'CREATE_MEETING', payload: response.data });
  history.push(`/meeting/${response.data.id}/${response.data.adminToken}`);
};

export const updateMeeting = (formValues, id, token, history) => async (dispatch) => {
  const response = await meeting.patch(`/meeting/${id}/${token}`, formValues);
  dispatch({ type: 'UPDATE_MEETING', payload: response.data });
  history.push(`/meeting/${response.data.id}/${response.data.adminToken}`);
};

export const fetchMeetings = () => async (dispatch) => {
  const response = await meeting.get('/meetings');

  dispatch({ type: 'FETCH_MEETINGS', payload: response.data });
};

export const fetchMeeting = (id, token) => async (dispatch) => {
  const url = token ? `/meeting/${id}/${token}` : `/meeting/${id}`;
  meeting.get(url)
    .then(response => dispatch({ type: 'FETCH_MEETING', payload: response.data }))
    .catch((err) => {
      // console.log(err);
      dispatch({ type: 'ADD_ERROR', payload: err.response.data });
    });
};

export const deleteMeeting = (id, token) => async (dispatch) => {
  meeting.delete(`/meeting/${id}/${token}`)
    .then(() => {
      dispatch({ type: 'DELETE_MEETING', payload: id });
    })
    .catch((err) => {
      // console.log(err);
      dispatch({ type: 'ADD_ERROR', payload: err.response.data });
    });
};
