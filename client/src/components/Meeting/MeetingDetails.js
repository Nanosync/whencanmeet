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
  Image,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import { fetchMeeting } from '../../actions';
import { meetingType } from '../../types';
import ShareModal from '../ShareModal';

class MeetingDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showShareModal: false,
      copyUrlAcknowledgement: false,
      adminPageUrl: ''
    };
  }

  componentDidMount() {
    const { match, fetchMeeting: fetchMeetingRedux } = this.props;
    const { id, token } = match.params;

    document.title = 'Meeting Details / When Can Meet';

    fetchMeetingRedux(id, token);

    this.setState({ adminPageUrl: `${window.location.origin}/meeting/${id}/${token}` });
  }
  
  handleCopyClick = (e) => {
    const { adminPageUrl } = this.state;
    navigator.clipboard.writeText(adminPageUrl);
    this.setState({ copyUrlAcknowledgement: true });
  };

  renderAdmin() {
    const { meeting } = this.props;

    if (meeting.adminToken) {
      const { id, adminToken } = meeting;
      const { copyUrlAcknowledgement } = this.state;

      return (
        <div className="my-4">
          <hr />
          <p>
            <strong>
              Bookmark this page or you&apos;ll lose access to the following options!
            </strong>
          </p>
          <InputGroup className="mb-3" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
            <FormControl
              value={`${window.location.origin}/meeting/${id}/${adminToken}`}
              aria-label="Share URL"
              aria-describedby="basic-addon2"
              readOnly
            />
            <InputGroup.Append>
              <Button id="basic-addon2" title="Copy URL" aria-label="Copy URL" variant="primary" onClick={this.handleCopyClick}>
                { /* eslint-disable-next-line */ }
                <i className="fa fa-files-o" aria-hidden="true"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
          { copyUrlAcknowledgement ? (
            <p style={{ color: 'green' }}>
              Link copied to clipboard!
            </p>
            ) : null }
          <ButtonToolbar className="ml-auto">
            <Link to={`/meeting/update/${id}/${adminToken}`}>
              <Button variant="info" size="lg" className="mr-1">Edit</Button>
            </Link>
            <Link to={`/meeting/delete/${id}/${adminToken}`}>
              <Button variant="danger" size="lg">Delete</Button>
            </Link>
          </ButtonToolbar>
        </div>
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
      id,
      name,
      description,
      startDate,
      endDate,
      location,
      website
    } = meeting;

    const { showShareModal } = this.state;

    return (
      <Container className="my-4">
        <h1>Meeting Details</h1>
        <hr />
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
            <ButtonToolbar>
              <Button href={website} variant="primary" className="mr-1">Click here to signup</Button>
              <Button variant="success" onClick={() => this.setState({ showShareModal: true })}>Share this event</Button>
              <ShareModal shareURL={`${window.location.origin}/meeting/${id}`} show={showShareModal} onHide={() => this.setState({ showShareModal: false })} />
            </ButtonToolbar>
            {this.renderAdmin()}
          </Col>
        </Row>
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
