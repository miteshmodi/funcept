import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import VideoCard from "../components/VideoCard";
import "./style.css";

function ActivityFeed() {
    return (
        <div>
        <Container style={{ marginTop: 30 }}>
          <Row>
            <Col size="md-12">
            <h1>Activity Feed</h1>
            <VideoCard />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  
  export default ActivityFeed;