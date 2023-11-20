import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/customers/customerSlice";
import styled from "styled-components";
import { resetAccount } from "../features/accounts/accountSlice";

const LogoutButton = styled.button`
  background-image: url(https://tbconline.ge/tbcrd/assets/img/main/logout.svg) !important;
  background-repeat: no-repeat;
  background-size: 100%;
  border: none;
  outline: none;
  background: transparent;
  height: 30px;
  width: 30px;
  margin: 12px 0 5px 23px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const UserImage = styled.img`
  cursor: pointer;
  max-width: 34px;
  max-height: 34px;
  min-height: 34px;
  min-width: 34px;
  border-radius: 50%;
  margin-left: 10px;
`;
export interface Store {
  account: {
    balance: number;
    loan: number;
    loanPurpose: string;
    isLoading: boolean;
  };
  customer: {
    token: string | null;
    isLoggedIn: boolean;
    tokenExpirationTime: string | null;
    isRegistered: boolean;
    username: string | null;
  };
}

const NavbarWrapper = styled.div`
  nav {
    width: 100%;
    background-color: #00a3e0;
    display: flex;
    align-items: center;
  }
  nav * {
    color: white;
  }

  nav a:hover {
    color: white;
  }
`;

function LoggedInHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetAccount());
    navigate("/");
  };
  const { username: customerUsername } = useSelector(
    (store: Store) => store.customer
  );
  return (
    <NavbarWrapper>
      <Navbar>
        <Container>
          <Navbar.Brand href="/main">
            <img src="logo.svg" alt="logo" className="tbclogo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#memes">
                {customerUsername}
                <UserImage
                  src="https://tbconline.ge/tbcrd/assets/img/avatar.png"
                  alt="user-image"
                />
              </Nav.Link>

              <Nav.Item>
                <LogoutButton
                  type="button"
                  onClick={logoutHandler}
                ></LogoutButton>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </NavbarWrapper>
  );
}

export default LoggedInHeader;
