import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import { connect } from 'react-redux';
import MeetingForm from './MeetingForm';
import { fetchMeeting, updateMeeting } from '../../actions';
import { meetingType } from '../../types';


class MeetingUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const { match, fetchMeeting: fetchMeetingRedux } = this.props;
    const { id, token } = match.params;

    document.title = 'Update Meeting / When Can Meet?';

    fetchMeetingRedux(id, token);
  }

  handleFormSubmit = (values, { setSubmitting }) => {
    const { history, match, updateMeeting: updateMeetingRedux } = this.props;
    const { id, token } = match.params;
    updateMeetingRedux(values, id, token, history);
    setSubmitting(false);
  }

  render() {
    const { meeting } = this.props;
    if (!meeting) {
      return null;
    }

    const { id, adminToken, ...formValues } = meeting;

    formValues.startDate = new Date(formValues.startDate);
    formValues.endDate = new Date(formValues.endDate);

    return (
      <Container className="my-4">
        <Row>
          <Col>
            <h1>Update Meeting</h1>
            <p className="lead">Enter your meeting details below.</p>
            <hr />
          </Col>
        </Row>
        <MeetingForm onSubmit={this.handleFormSubmit} initialValues={formValues} formButtonText="Update Meeting" />
        <br />
        <Link to={`/meeting/${id}/${adminToken}`}>I don&apos;t want to make any changes</Link>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  meeting: state.meetings[ownProps.match.params.id]
});


MeetingUpdate.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  fetchMeeting: PropTypes.func.isRequired,
  updateMeeting: PropTypes.func.isRequired,
  meeting: meetingType
};

export default withRouter(connect(
  mapStateToProps,
  { fetchMeeting, updateMeeting },
)(MeetingUpdate));
