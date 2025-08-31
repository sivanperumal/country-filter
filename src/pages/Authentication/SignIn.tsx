import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { loginUser, useUsers } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router";
import BGpic from "./../../assets/bg-pic.png";

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters long, contain 1 uppercase letter, 1 number, and 1 symbol."
      );
      return;
    }
    dispatch(loginUser({ username: "emilys", password: "emilyspass" }));
  };
  const { user } = useUsers();
  useEffect(() => {
    if (user?.id) {
      navigate("/countries");
    }
  }, [navigate, user]);

  return (
    <Container className="d-flex vh-100 px-4 px-md-0">
      <Row className="m-auto w-100 align-items-center loginpage-row">
        <Col xs={12} md={6} className="p-4">
          <div className="mw-70 signin-form-wrapper">
            <h3 className="mb-3 module-title text-center text-md-start">
              Sign In
            </h3>
            <p className="text-center text-md-start">
              New user? <a href="/">Create an account</a>
            </p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form className="signinForm" onSubmit={handleSubmit}>
              <FormGroup controlId="formUsername" className="mb-3">
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Username or email"
                  value={formData.username}
                  onChange={handleOnChange}
                  required
                />
              </FormGroup>
              <FormGroup className="mb-3" controlId="formPassword">
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleOnChange}
                  required
                />
              </FormGroup>
              <FormGroup className="mb-3 d-flex align-items-center">
                <FormCheck type="checkbox" label="Keep me signed in" />
              </FormGroup>

              <Button type="submit" variant="dark" className="w-100">
                Sign In
              </Button>
            </Form>
          </div>
          <Container className="login-socialmedia">
            <h4>Or Sign In With</h4>
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
          </Container>
        </Col>
        <Col
          md={6}
          className="d-none d-md-flex justify-content-center align-items-center"
        >
          <img src={BGpic} alt="signin" style={{ maxWidth: "300px" }} />
        </Col>
      </Row>
    </Container>
  );
};
export default SignIn;
