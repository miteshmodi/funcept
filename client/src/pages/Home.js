import React from "react";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import "./style.css";
import SignInForm from "../components/SignInForm";
import HomeImage from "../components/HomeImage";

function Home() {
  return (
    <div>
     <HomeImage>
       <h1>FunCept</h1>
     </HomeImage>
      <Container style={{ marginTop: 30 }}>
        <Row>
          <Col size="md-12">
            <h1>Sign In</h1>
            <SignInForm />
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default Home;
