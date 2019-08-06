import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import { connect } from 'react-redux';
import MeetingForm from './MeetingForm';
import { createMeeting } from '../../actions';


class MeetingCreate extends React.Component {
  componentDidMount() {
    document.title = 'Create Meeting / When Can Meet?';
  }

  handleFormSubmit = (values, { setSubmitting }) => {
    const { createMeeting: createMeetingRedux, history } = this.props;
    createMeetingRedux(values, history);
    setSubmitting(false);
  };

  render() {
    return (
      <Container className="my-4">
        <Row>
          <Col>
            <h1>Create Meeting</h1>
            <p className="lead">Enter your meeting details below.</p>
            <hr />
            
          </Col>
        </Row>
        <MeetingForm onSubmit={this.handleFormSubmit} formButtonText="Create Meeting" />
      </Container>
    );
  }
}

MeetingCreate.propTypes = {
  createMeeting: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(connect(
  null,
  { createMeeting },
)(MeetingCreate));
