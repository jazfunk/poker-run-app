import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const SignUpComponent = (props) => {
  return (
    <section className="form-container">
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formAddUserFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.add_first_name}
              type="text"
              placeholder=""
              name="add_first_name"
              required={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formAddUserLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.add_last_name}
              type="text"
              placeholder=""
              name="add_last_name"
              required={true}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formAddUserEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.add_email}
              type="email"
              placeholder=""
              name="add_email"
              required={true}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
            <Form.Group as={Col} controlId="formAddUserPassWord">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={props.handleChange}
                defaultValue={props.add_password}
                type="password"
                placeholder=""
                name="add_password"
                required={true}
              />
            </Form.Group>
            &nbsp;&nbsp;
            <Form.Group as={Col} controlId="formAddUserPassWordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={props.handleChange}
                defaultValue={props.add_passwordConfirm}
                type="password"
                placeholder=""
                name="add_passwordConfirm"
                required={true}
              />
            </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            controlId="formAddUserSubmitButton"
            className="submitbtn-formgroup"
          >
            <Button variant="light" type="submit" className="submit-btn">
              Add User
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </section>
  );
};

export default SignUpComponent;
