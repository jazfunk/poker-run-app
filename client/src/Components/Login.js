import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  return (
    <section className="form-container">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="" />
        </Form.Group>

        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Admin" />
        </Form.Group> */}

        <Button variant="light" type="submit">
          Sign In
        </Button>
      </Form>
    </section>
  );
};

export default Login;
