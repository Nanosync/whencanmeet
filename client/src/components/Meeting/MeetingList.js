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
import Moment from 'react-moment';
import { fetchMeetings } from '../../actions';
import { meetingType } from '../../types';

class MeetingList extends React.Component {
  componentDidMount() {
    const { fetchMeetings: fetchMeetingsRedux } = this.props;
    fetchMeetingsRedux();
  }

  renderItems() {
    const { meetings } = this.props;

    return meetings.map(item => (
      <tr key={item.id}>
        <td>
          <Link to={`/meeting/${item.id}`}>{item.name}</Link>
        </td>
        <td>{item.description}</td>
        <td>{item.location}</td>
        <td><Moment fromNow>{item.startDate}</Moment></td>
        <td><Moment fromNow>{item.endDate}</Moment></td>
      </tr>
    ));
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
            <h1>Meetings</h1>
            <hr />
          </Col>
        </Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="w-25">Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
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
