import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';

import store from './store';
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
        <Provider store={store}>
          <Navbar />
          <Wrapper>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/about" component={Home} />
              <ProtectedRoute exact path="/profile" component={Profile} />
              <ProtectedRoute exact path="/activityfeed" component={ActivityFeed} />
              <ProtectedRoute exact path="/uploadvideos" component={UploadVideos} />
              <ProtectedRoute exact path="/findpeople" component={FindPeople} />
              <Route path='*' component={() => <h1>404 Not Found</h1>} />
            </Switch>
          </Wrapper>
          <Footer />
        </Provider>
      </div>
    </Router>
  );
}

export default App;
