import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import "./style.css";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  return (
    <div>
     
      <Container style={{ marginTop: 30 }}>
        <Row>
          <Col size="md-12">
            <h1>Sign Up</h1>
            <SignUpForm />
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default SignUp;