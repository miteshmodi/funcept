import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ActivityFeed from "./pages/ActivityFeed";
import UploadVideos from "./pages/UploadVideos";
import FindPeople from "./pages/FindPeople";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/activityfeed" component={ActivityFeed} />
          <Route exact path="/uploadvideos" component={UploadVideos} />
          <Route exact path="/findpeople" component={FindPeople} />
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
