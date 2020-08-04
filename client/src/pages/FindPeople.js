import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import FindProfiles from "../components/FindProfiles";
import "./style.css";

function FindPeople() {
    return (
        <div>
        <Container style={{ marginTop: 30 }}>
          <Row>
            <Col size="md-12">
            <h1>Find People</h1>
            <FindProfiles />
            </Col>
          </Row>
          
        </Container>
      </div>
    );
  }
  
  export default FindPeople;