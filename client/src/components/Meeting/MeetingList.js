import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Table
} from 'react-bootstrap';
import moment from 'moment';
import Moment from 'react-moment';
import { fetchMeetings } from '../../actions';
import { meetingType } from '../../types';

class MeetingList extends React.Component {
  componentDidMount() {
    const { fetchMeetings: fetchMeetingsRedux } = this.props;

    document.title = 'Public Meetings / When Can Meet';

    fetchMeetingsRedux();
  }

  renderItems() {
    const { meetings } = this.props;

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
        <tr key={item.id}>
          <td>
            <Link to={`/meeting/${item.id}`}><strong>{item.name}</strong></Link>
          </td>
          <td style={{ wordBreak: 'break-word' }}>{desc}</td>
          <td>{item.location}</td>
          <td><span title={moment(item.startDate).format('YYYY-MM-DD HH:mm')}><Moment fromNow>{item.startDate}</Moment></span></td>
          <td><Moment fromNow>{item.endDate}</Moment></td>
        </tr>
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
            <h1>Public Meetings</h1>
            <p className="lead">View the latest meetings below.</p>
            <hr />
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="w-25">Name</th>
              <th className="w-25">Description</th>
              <th>Location</th>
              <th>Starts</th>
              <th>Ends</th>
            </tr>
          </thead>
          <tbody>
            {this.renderItems()}
          </tbody>
        </Table>
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

export default connect(
  mapStateToProps,
  { fetchMeetings }
)(MeetingList);
