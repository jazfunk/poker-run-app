import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const Signup = (props) => {
  return (
    <section className="form-container">
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formAddUserFirstName">
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
          <Form.Group as={Col} controlId="formAddUserLastName">
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
          <Form.Group as={Col} controlId="formAddUserEmail">
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
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formAddUserPassWord">
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

        <Form.Row>
          <Form.Group as={Col} controlId="formAddUserCheckbox">
            <Form.Check
              type="checkbox"
              defaultChecked={props.is_admin}
              name="is_admin"
              label="Admin"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formAddUserSubmitButton" className="submitbtn-formgroup">
            <Button variant="light" type="submit" className="submit-btn">
              Sign Up
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </section>
  );
};

export default Signup;
