import { Col, Container, Row } from "react-bootstrap";

export default function FooterComponent() {
  return (
    <footer className="bg-light text-dark text-center p-3 mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} - Create with ❤️ by{" "}
              <a
                href="https://linkedin.com/in/seinkiannalesmana"
                className="text-dark"
              >
                Seinki Anna Lesmana
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
