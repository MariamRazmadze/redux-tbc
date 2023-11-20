import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const NavbarWrapper = styled.div`
  nav * {
    color: rgba(255, 255, 255, 0.76) !important;
  }
`;

function Header() {
  return (
    <NavbarWrapper>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/main">
            <img src="logo.svg" alt="logo" className="tbclogo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#deets">tbcbank.ge</Nav.Link>
              <Nav.Link href="#memes">
                უსაფრთხოება და კონფიდენციალურობა
              </Nav.Link>
              <Nav.Link href="#memes">დაგვიკავშირდი</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </NavbarWrapper>
  );
}

export default Header;
