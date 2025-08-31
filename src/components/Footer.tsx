import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-4 mt-5">
      <Container>
        <Row className="justify-content-center mb-3 social-icon-row">
          <Col xs="auto" className="d-flex gap-3">
            <a
              href="#"
              className="text-dark fs-4 border rounded-circle text-center py-1"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-dark fs-4 border rounded-circle text-center py-1"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-dark fs-4 border rounded-circle text-center py-1"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="text-dark fs-4 border rounded-circle text-center py-1"
            >
              <FaYoutube />
            </a>
          </Col>
        </Row>

        <Row className="justify-content-center copyright-content">
          <Col xs="auto" className="text-center">
            <p className="mb-1">Example@email.com</p>
            <p className="mb-0">&copy; 2020 Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
