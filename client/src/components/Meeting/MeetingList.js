import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image
} from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/en-SG';
import Moment from 'react-moment';
import { fetchMeetings } from '../../actions';
import { meetingType } from '../../types';

class MeetingList extends React.Component {
  componentDidMount() {
    const { fetchMeetings: fetchMeetingsRedux } = this.props;

    document.title = 'Meetings and Events / When Can Meet?';
    moment.locale('en-SG');

    fetchMeetingsRedux();
  }

  renderItems() {
    const { meetings, history } = this.props;

    /*
    const sorted = meetings.slice(0).sort((a, b) => {
      if (moment(a.startDate).isAfter(moment(b.startDate))) {
        return 1;
      }
      
      if (moment(a.startDate).isBefore(moment(b.startDate))) {
        return -1;
      }

      return 0;
    });
    */
    
    const now = new Date();

    return meetings.map((item) => {
      if (moment(item.startDate) < moment(now) && moment(item.endDate) < moment(now)) {
        return null;
      }

      let desc = item.description;

      if (desc.length > 128) {
        desc = `${desc.substring(0, 128)}...`;
      }

      return (
        <ListGroup.Item key={item.id}>
          <Container>
            <Row>
              <Col xs={4} sm={4} md={2}>
                <Image src="/images/event.png" fluid rounded />
              </Col>
              <Col xs={8} sm={8} md={10}>
                <div className="d-flex w-100 justify-content-between">
                  <h4 className="mb-1"><Link to={`/meeting/${item.id}`}>{item.name}</Link></h4>
                </div>
                <div>
                  <small><Moment format="llll ZZ">{item.startDate}</Moment></small>
                  <br />
                  <small>
                    { /* eslint-disable-next-line */ }
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    &nbsp;
                    {item.location}
                  </small>
                </div>
                <p className="mb-1">{desc}</p>
              </Col>
            </Row>
          </Container>
          

        </ListGroup.Item>
      );
    });
  }

  render() {
    const { meetings } = this.props;

    if (!meetings) {
      return null;
    }
    
    // console.log(this.props);
    return (
      <Container className="my-4">
        <Row>
          <Col>
            <h1>Meetings and Events</h1>
            <p className="lead">View the latest events below.</p>
          </Col>
        </Row>
        <ListGroup variant="flush" className="d-flex">
          {this.renderItems()}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  meetings: Object.values(state.meetings)
});

MeetingList.propTypes = {
  fetchMeetings: PropTypes.func.isRequired,
  meetings: PropTypes.arrayOf(meetingType)
};

MeetingList.defaultProps = {
  meetings: []
};

export default withRouter(connect(
  mapStateToProps,
  { fetchMeetings }
)(MeetingList));
