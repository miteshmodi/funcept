import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import ProfileCard from "../components/ProfileCard";
import "./style.css";

function Profile() {
    return (
        <div className="textMain">
        <Container style={{ marginTop: 30 }}>
        
          <Row>
            <Col size="md-12">
            <h1>Profile</h1>
            <ProfileCard />
            
            
            </Col>
          </Row>
          
        </Container>
      </div>
    );
  }
  
  export default Profile;