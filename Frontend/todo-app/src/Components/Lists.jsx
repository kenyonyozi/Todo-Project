import React from 'react';
import { Button, Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

const Lists = ({text , remove}) => {
  return (
    <Card className="" style={{ height: "", marginTop: "1rem" }}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto">
                <Card.Text>{text}</Card.Text>
              </Col>
              <Col xs="auto">
                <Button  onClick={remove} style={{ marginLeft: "7rem" }} variant="danger">
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
  )
}

export default Lists