import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card
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
    document.title = 'When Can Meet?';
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
          <Col lg={4} md={4} sm={4} xs={4} className="text-right">
            <Image src="/images/logo.png" alt="Logo" style={{ width: '150px', height: '150px' }} />
          </Col>
          <Col lg={8} md={8} sm={8} xs={8} className="my-auto">
            <h1>When Can Meet?</h1>
            <p className="lead">A service to arrange meetings and events.</p>
          </Col>
        </Row>

        <br />

        <Row className="text-center">
          <Col sm={12} md={4} style={{ paddingBottom: '1em' }}>
            <Card>
              <Card.Body>
                <Card.Title>Meeting someone, or a group?</Card.Title>
                <Card.Text>
                  Organise a meeting and share it.
                  <br />
                  It&apos;s absolutely free!
                </Card.Text>
                <Link to="/meeting/create">
                  <Button variant="success" size="lg">Create a meeting</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} style={{ paddingBottom: '1em' }}>
            <Card>
              <Card.Body>
                <Card.Title>Already have a private meeting?</Card.Title>
                <Card.Text>
                  <Form
                    onSubmit={e => this.handleFormSubmit(e)}
                    className="my-2"
                    autoComplete="off"
                  > 
                    <Form.Group as={Row} controlId="codeGrp">
                      <Col xs={{ span: 10, offset: 1 }}>
                        <Form.Control type="text" name="code" value={code} onChange={e => this.setState({ code: e.target.value })} placeholder="Enter meeting code" required />
                      </Col>
                    </Form.Group>

                    <Button size="lg" variant="primary" type="submit">
                      Check it out
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Find out what&apos;s happening</Card.Title>
                <Card.Text>
                  Discover something fun today.
                  <br />
                  Browse new events in your area.
                </Card.Text>
                <Link to="/meetings">
                  <Button size="lg" variant="info">
                    View public events
                  </Button>
                </Link>
              </Card.Body>
            </Card>
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
