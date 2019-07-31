import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';


class MeetingHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: ''
    };
  }

  componentDidMount() {
    document.title = 'When Can Meet';
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { code } = this.state;
    if (!code || !code.trim()) {
      return;
    }

    const { history } = this.props;
    history.push(`/meeting/${code}`);
  }

  render() {
    const { code } = this.state;

    return (
      <Container className="my-4">
        <Row>
          <Col md="2" sm="3" xs="3" className="text-right">
            <img src="/images/logo.png" alt="Logo" style={{ width: '100px', height: '100px' }} />
          </Col>
          <Col md="10" sm="9" xs="9">
            <h1>When Can Meet?</h1>
            <p className="lead">A service to arrange meetings.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Looking to meet in person?</h3>
            <Link to="/meeting/create">
              <Button variant="success" className="my-4">
                Create a meeting
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Already have a private meeting?</h3>
          </Col>
        </Row>
        <Form
          onSubmit={e => this.handleFormSubmit(e)}
          className="my-2"
          autoComplete="off"
        > 
          <Form.Group as={Row} controlId="codeGrp">
            <Form.Label column sm="2">Meeting Code</Form.Label>
            <Col sm="10">
              <Form.Control type="text" name="code" value={code} onChange={e => this.setState({ code: e.target.value })} placeholder="Enter code" />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit">
            Check it out
          </Button>
        </Form>

        <Row>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>View public meetings</h3>
            <Link to="/meetings">
              <Button variant="info" className="my-4">
                Show all
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

MeetingHome.propTypes = {
  history: ReactRouterPropTypes.history.isRequired
};

export default withRouter(MeetingHome);
