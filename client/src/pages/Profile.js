import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import "./style.css";

function Profile() {
    return (
        <div className="textMain">
        <Container style={{ marginTop: 30 }}>
        
          <Row>
            <Col size="md-12">
            <h1>Profile</h1>
            
            
            
            </Col>
          </Row>
          
        </Container>
      </div>
    );
  }
  
  export default Profile;