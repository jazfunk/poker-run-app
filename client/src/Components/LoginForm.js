import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
  return (
    <section className="login-form">
      <section className="heading-directions">
        <h4>Enter your login and password.  Click the "Sign In" button.</h4>
        <hr></hr>
      </section>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group controlId="formLoginEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder=""
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder=""
            onChange={props.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formLoginSubmit">
          <Button variant="light" type="submit" className="submit-btn">
            Sign In
          </Button>
        </Form.Group>
      </Form>
    </section>
  );
};

export default LoginForm;
