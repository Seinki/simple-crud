import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <Container fluid>
      <Navbar
        expand="lg"
        fixed="top"
        bg="light"
        variant="light"
        style={{ height: "100px" }}
        collapseOnSelect
        className="mb-5 p-4 shadow d-flex justify-content-center align-items-center"
      >
        <Link to="/" className="text-decoration-none text-center fw-bold">
          <Navbar.Brand className="text-primary fs-2">
            Simple CRUD with React.js & Express.js
          </Navbar.Brand>
        </Link>
      </Navbar>
    </Container>
  );
}
