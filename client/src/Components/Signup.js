import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"

const Signup = (props) => {
  return (
    <section className="form-container">
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="frmFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.firstName}
              type="text"
              placeholder=""
              name="firstName"
              required={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="frmLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.lastName}
              type="text"
              placeholder=""
              name="lastName"
              required={true}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="frmEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.email}
              type="email"
              placeholder=""
              name="email"
              required={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="frmPassWord">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.passWord}
              type="password"
              placeholder=""
              name="passWord"
              required={true}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Admin" />
        </Form.Group>
        <Button variant="light" type="submit">
          Sign Up
        </Button>
      </Form>
    </section>
  );
};

export default Signup;
