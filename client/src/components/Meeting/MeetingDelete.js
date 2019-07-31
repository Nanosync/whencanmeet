import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { fetchMeeting, deleteMeeting } from '../../actions';
import MyModal from '../MyModal';
import { meetingType } from '../../types';

class MeetingDelete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonEnabled: true
    };
  }
  
  componentDidMount() {
    const { fetchMeeting: fetchMeetingRedux, match } = this.props;
    const { id } = match.params;

    fetchMeetingRedux(id);
  }

  handleDelete(e) {
    const { deleteMeeting: deleteMeetingRedux, match, history } = this.props;
    const { id, token } = match.params;
    
    deleteMeetingRedux(id, token);
    this.setState({ buttonEnabled: false });

    setTimeout(() => {
      history.push('/');
    }, 300);
  }
  
  renderButtons() {
    const { buttonEnabled } = this.state;

    return (
      <React.Fragment>
        <Button
          onClick={e => this.handleDelete(e)}
          disabled={!buttonEnabled}
          variant="danger"
        >
          Delete
        </Button>
        <Link to="/">
          <Button variant="secondary">
            Cancel
          </Button>
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    const { meeting } = this.props;

    if (!meeting) {
      return 'Are you sure you want to delete this meeting?';
    }

    return `Are you sure you want to delete the meeting: ${meeting.name}?`;
  }

  render() {
    const { history } = this.props;

    return (
      <MyModal
        title="Delete Meeting"
        body={this.renderContent()}
        buttons={this.renderButtons()}
        show
        onHide={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  meeting: state.meetings[ownProps.match.params.id]
});

MeetingDelete.propTypes = {
  fetchMeeting: PropTypes.func.isRequired,
  deleteMeeting: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  meeting: meetingType.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchMeeting, deleteMeeting }
  )(MeetingDelete)
);
