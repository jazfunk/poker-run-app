import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

const AddNewRunComponent = (props) => {
  return (
    <section className="form-container">
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formAddRunName">
            <Form.Label>Run Name</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.run_name}
              type="text"
              placeholder=""
              name="run_name"
              required={true}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formAddRunDescription">
            <Form.Label>Run Description</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.run_description}
              type="text"
              placeholder=""
              name="run_description"
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formAddRunDate">
            <Form.Label>Run Date</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.run_date}
              type="date"
              placeholder=""
              name="run_date"
              required={true}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formAddRunOwner">
            <Form.Label>Run Owner Id</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              defaultValue={props.owner_id}
              type="text"
              placeholder=""
              name="owner_id"
              required={true}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            controlId="formAddRunSubmitButton"
            className="submitbtn-formgroup"
          >
            <Button variant="light" type="submit" className="submit-btn">
              Sign Up
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </section>
  );
};

export default AddNewRunComponent;
