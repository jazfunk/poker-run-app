import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  return (
    <section className="form-container">
      <Form>
        <Form.Group controlId="formLoginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="" />
        </Form.Group>

        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="" />
        </Form.Group>

        {/* <Form.Group controlId="formLoginCheckbox">
          <Form.Check type="checkbox" label="Admin" />
        </Form.Group> */}

        <Form.Group controlId="formLoginSubmit" className="submitbtn-formgroup">
          <Button variant="light" type="submit" className="submit-btn">
            Sign In
          </Button>
        </Form.Group>
      </Form>
    </section>
  );
};

export default Login;
