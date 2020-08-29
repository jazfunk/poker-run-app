import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const Signup = (props) => {
  return (
    <section className="form-container">
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="frmFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.first_name}
              type="text"
              placeholder=""
              name="first_name"
              required={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="frmLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.last_name}
              type="text"
              placeholder=""
              name="last_name"
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
              defaultValue={props.password}
              type="password"
              placeholder=""
              name="password"
              required={true}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            defaultChecked={props.is_admin}
            name="is_admin"
            label="Admin"
          />
        </Form.Group>
        <Button variant="light" type="submit">
          Sign Up
        </Button>
      </Form>
    </section>
  );
};

export default Signup;
