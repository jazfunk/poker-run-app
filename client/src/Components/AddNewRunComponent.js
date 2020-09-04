import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddNewRunComponent = (props) => {
  return (
    <section className="form-container">
      <Form onSubmit={props.handleSubmit}>
        <Form.Row>
          <Form.Group controlId="formAddRunName">
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
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="formAddRunDescription">
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
          <Form.Group controlId="formAddRunDate">
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
          <Form.Group controlId="frmUsersNamesSelect">
            <select
              defaultValue={props.owner_id}
              onChange={props.handleSelect}
            >
              <option>---Select Run Owner---</option>
              {props.users.map((user) => (
                <option key={user.full_name} value={user.id}>
                  {user.full_name}
                </option>
              ))}             
            </select>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group controlId="formAddRunSubmitButton">
            <Button variant="light" type="submit" className="submit-btn">
              Create Run Event
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </section>
  );
};

export default AddNewRunComponent;
