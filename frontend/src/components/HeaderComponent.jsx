import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, registerUser, checkAdminStatus } from "../redux/actions/authActions";
import { getDishes } from "../redux/actions/dishActions";
import { getPromotions } from "../redux/actions/promoReducer";
import { getLeaders } from "../redux/actions/leaderActions";
import axios from "axios";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthLoading = useSelector((state) => state.auth.isLoading);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePassowrdInput = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordInput = (e) => {
    setRepeatPassword(e.target.value);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords are not the same!");
      return;
    }

    dispatch(registerUser({ username, password }));
    setIsRegisterModalOpen(false);
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const fetchInfo = () => {
    dispatch(getDishes());
    dispatch(getPromotions());
    dispatch(getLeaders());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please Login or register to view the website");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      axios.defaults.headers["Authorization"] = "Bearer " + token;
      fetchInfo();

      dispatch(checkAdminStatus());
    }
  }, [isAuthenticated]);
  
  return (
    <React.Fragment>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={() => setIsNavOpen(!isNavOpen)} />
          <NavbarBrand className="mr-auto" href="/">
            <img
              src="assets/images/logo.png"
              height="30"
              width="41"
              alt="Ristorante Con Fusion"
            />
          </NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg"></span> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  <span className="fa fa-info fa-lg"></span> About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  <span className="fa fa-list fa-lg"></span> Menu
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/contactus">
                  <span className="fa fa-address-card fa-lg"></span> Contact Us
                </NavLink>
              </NavItem>
              {
                isAdmin &&
                <NavItem>
                  <NavLink className="nav-link" to="/admin">
                    <span className="fa fa-columns fa-lg"></span> Admin Control Panel
                  </NavLink>
                </NavItem>
              }
            </Nav>
            <Nav className="ms-auto" navbar>
              {user && (
                <NavItem className="navbar-text me-5">
                  <span className="fa fa-user-circle fa-lg me-2"></span>
                  {user}
                </NavItem>
              )}
              {
                !isAuthenticated && (
                  <Button className="me-5" outline onClick={() => setIsRegisterModalOpen(!isRegisterModalOpen)}>
                    <span className="fa fa-sign-in fa-lg"></span> Register
                    {isAuthLoading ? (
                      <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    ) : null}
                  </Button>
                )
              }
              <NavItem>
                {!isAuthenticated ? (
                  <Button outline onClick={() => setIsModalOpen(!isModalOpen)}>
                    <span className="fa fa-sign-in fa-lg"></span> Login
                    {isAuthLoading ? (
                      <span className="fa fa-spinner fa-pulse fa-fw"></span>
                    ) : null}
                  </Button>
                ) : (
                  <div>
                    <Button outline onClick={handleLogOut}>
                      <span className="fa fa-sign-out fa-lg"></span> Logout
                      {isAuthLoading ? (
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      ) : null}
                    </Button>
                  </div>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <Jumbotron>
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Ristorante Con Fusion</h1>
              <p>
                We take inspiration from the World's best cuisines, and create a
                unique fusion experience. Our lipsmacking creations will tickle
                your culinary senses!
              </p>
            </div>
          </div>
        </div>
      </Jumbotron>
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
        <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>
          Login
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                onChange={handleUsernameInput}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={handlePassowrdInput}
              />
            </FormGroup>
            <br />
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Modal isOpen={isRegisterModalOpen} toggle={() => setIsRegisterModalOpen(!isRegisterModalOpen)}>
        <ModalHeader toggle={() => setIsRegisterModalOpen(!isRegisterModalOpen)}>
          Register
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleRegister}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                onChange={handleUsernameInput}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                onChange={handlePassowrdInput}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="repeatPassword">Repeat Password</Label>
              <Input
                type="password"
                id="repeatPassword"
                name="repeatPassword"
                onChange={handleRepeatPasswordInput}
              />
            </FormGroup>
            <br />
            <Button type="submit" value="submit" color="primary">
              Register
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Header;
