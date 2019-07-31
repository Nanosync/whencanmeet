import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  ButtonToolbar,
  Image
} from 'react-bootstrap';
import { fetchMeeting } from '../../actions';
import { meetingType } from '../../types';

class MeetingDetails extends React.Component {
  componentDidMount() {
    const { match, fetchMeeting: fetchMeetingRedux } = this.props;
    const { id, token } = match.params;

    document.title = 'Meeting Details / When Can Meet';

    fetchMeetingRedux(id, token);
  }

  renderAdmin() {
    const { meeting } = this.props;

    if (meeting.adminToken) {
      const { id, adminToken } = meeting;

      return (
        <Row className="text-right">
          <Col>
            <p>
              <strong>
                Bookmark this page or you&apos;ll lose access to the following options!
              </strong>
            </p>
            <ButtonToolbar>
              <Link to={`/meeting/update/${id}/${adminToken}`}>
                <Button variant="primary" size="lg">Edit</Button>
              </Link>
              <Link to={`/meeting/delete/${id}/${adminToken}`}>
                <Button variant="danger" size="lg">Delete</Button>
              </Link>
            </ButtonToolbar>
          </Col>
        </Row>
      );
    }

    return null;
  }

  render() {
    const { error, meeting } = this.props;

    if (error && error.error_message) {
      return (
        <Container className="my-4">
          <Row>
            <Col>
              <h1>Meeting Details</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="lead">Oops, there was an error:</p>
              <p className="lead">{error.error_message}</p>
            </Col>
          </Row>
        </Container>
      );
    }

    if (!meeting) {
      return null;
    }

    const {
      name,
      description,
      startDate,
      endDate,
      location,
      website
    } = meeting;

    return (
      <Container className="my-4">
        <Row>
          <Col>
            <h1>Meeting Details</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <h3><Moment format="DD/MM/YYYY hh:mma">{startDate}</Moment></h3>
            <p className="lead">
              Till&nbsp;
              <Moment format="DD/MM/YYYY hh:mma">{endDate}</Moment>
            </p>
          </Col>
          <Col md={10}>
            <h2>{name}</h2>
            <Image src="/images/placeholder-820x320.png" alt="Logo" fluid />
            <p className="lead">{description}</p>
            <p>
              Location:&nbsp;
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${location}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {location}
              </a>
            </p>
            <p><a href={website}>Click here to signup</a></p>
          </Col>
        </Row>
        {this.renderAdmin()}
      </Container>
    );  
  }
}

const mapStateToProps = (state, ownProps) => ({
  meeting: state.meetings[ownProps.match.params.id], 
  error: state.errors[ownProps.match.params.id]
});

MeetingDetails.propTypes = {
  meeting: meetingType,
  match: ReactRouterPropTypes.match.isRequired,
  fetchMeeting: PropTypes.func.isRequired,
  error: PropTypes.shape({
    error_message: PropTypes.string
  })
};

MeetingDetails.defaultProps = {
  error: {
    error_message: null
  },
  meeting: null
};

export default withRouter(
  connect(
    mapStateToProps, 
    { fetchMeeting }
  )(MeetingDetails)
);
