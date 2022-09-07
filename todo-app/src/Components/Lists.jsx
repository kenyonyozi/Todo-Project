import React from "react";
import { Card } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const Lists = ({ text, remove }) => {
  return (
    <Card
      className=""
      style={{ minHeight: "38px", minWidth: "89%", margin: "1rem", borderColor: "#249225" }}
    >
      <Card.Body style={{paddingTop:"0.5rem"}}>
        <Row className="align-items-center">
        <Col xs={1}>
            <div style={{  cursor: "pointer" }}>
              <i
                class="bi bi-check-circle"
                onClick={remove}
                style={{ color: "", marginLeft: "0rem" }}
              ></i>
            </div>
          </Col>
          <Col xs={9}>
            <Card.Text style={{ fontSize: "medium", color: "#0C3823" }}>
              {text}
              
            </Card.Text>
          </Col>
          <Col xs={1}>
            <div style={{ display: "flex" , cursor: "pointer" }}>
              <i
                class="bi bi-trash-fill"
                onClick={remove}
                style={{ color: "red", marginLeft: "1rem" }}
              ></i>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Lists;