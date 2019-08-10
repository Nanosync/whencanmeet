import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => (
  <footer className="footer mt-auto">
    <hr />
    <Container className="text-center">
      <Row>
        <Col>
          <p>
            This project was made with&nbsp;
            { /* eslint-disable-next-line react/self-closing-comp */}
            <i className="fa fa-heart" aria-hidden="true"></i>
            &nbsp;by&nbsp;
            <a href="https://benedictpak.com" rel="noopener noreferrer" target="_blank">
              Benedict Pak
            </a>
            , 2019.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
