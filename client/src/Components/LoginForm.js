import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = (props) => {
  return (
    <section className="form-container">
      <Form onSubmit={props.handleSubmit}>
        <Form.Group controlId="formLoginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="" onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="formLoginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="" onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="formLoginSubmit" className="submitbtn-formgroup">
          <Button variant="light" type="submit" className="submit-btn">
            Sign In
          </Button>
        </Form.Group>
      </Form>
    </section>
  );
};

export default LoginForm;
