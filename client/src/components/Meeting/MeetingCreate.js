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


function MeetingCreate(props) {
  const handleFormSubmit = (values, { setSubmitting }) => {
    props.createMeeting(values, props.history);
    setSubmitting(false);
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1>Create Meeting</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="lead">Enter your meeting details below.</p>
        </Col>
      </Row>
      <MeetingForm onSubmit={handleFormSubmit} formButtonText="Create Meeting" />
    </Container>
  );
}

MeetingCreate.propTypes = {
  createMeeting: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(connect(
  null,
  { createMeeting },
)(MeetingCreate));
