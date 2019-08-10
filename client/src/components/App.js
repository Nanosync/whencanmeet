import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import 'moment-timezone';
import Moment from 'react-moment';
import { Navbar } from 'react-bootstrap';
import MeetingHome from './Meeting/MeetingHome';
import MeetingCreate from './Meeting/MeetingCreate';
import MeetingList from './Meeting/MeetingList';
import MeetingDetails from './Meeting/MeetingDetails';
import MeetingUpdate from './Meeting/MeetingUpdate';
import MeetingDelete from './Meeting/MeetingDelete';
import Footer from './Footer';

Moment.globalMoment = moment;
Moment.globalLocale = 'en-SG';
Moment.globalTimezone = 'Asia/Singapore';
Moment.globalLocal = true;

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar bg="dark" variant="dark" expand="lg">
              <Link to="/">
                <Navbar.Brand>
                  { /* eslint-disable-next-line react/self-closing-comp */}
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  &nbsp;
                  When Can Meet?
                </Navbar.Brand>
              </Link>
            </Navbar>
            <Switch>
              <Route path="/" exact component={MeetingHome} />
              <Route path="/meetings" exact component={MeetingList} />
              <Route path="/meeting/create" exact component={MeetingCreate} />
              <Route path="/meeting/update/:id/:token" exact component={MeetingUpdate} />
              <Route path="/meeting/:id/:token" exact component={MeetingDetails} />
              <Route path="/meeting/:id" exact component={MeetingDetails} />
              <Route path="/meeting/delete/:id/:token" exact component={MeetingDelete} />
              <Route render={() => '404 Not Found'} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
