import React from "react";
import HomeLayout from "../components/HomeLayout";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

function ContactUsPage() {
  return (
    <HomeLayout>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={7}>
            <h1 className="text-center">Contact Us</h1>
            <ListGroup
              variant="flush"
              style={{ marginLeft: "-15px", marginRight: "-15px" }}
            >
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Email
                <span class="badge badge-primary badge-pill">
                  zaychinonline@gmail.com
                </span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Phone
                <span class="badge badge-primary badge-pill">
                  09 777 733322
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </HomeLayout>
  );
}

export default ContactUsPage;
