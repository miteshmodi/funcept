import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import UploadVideoForm from "../components/UploadVideoForm";
import "./style.css";

function UploadVideos() {
  return (
    <div>
      <Container style={{ marginTop: 30 }}>
        <Row>
          <Col size="md-12">
            <h1>Upload Videos</h1>
            <UploadVideoForm />
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default UploadVideos;