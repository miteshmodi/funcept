import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import session from './services/session';
import Header from "./components/Header";
import Login from './components/Login';
import Posts from './components/Posts';
import MyPosts from './components/MyPosts';
import FollowingsPosts from './components/FollowingsPosts';
import Signup from './components/Signup';
import PostPage from "./components/PostPage";
import Users from "./components/Users";
import UserPosts from "./components/UserPosts";
import UpdatePassword from "./components/UpdatePassword";
import Profile from "./components/Profile";
import Followings from "./components/Followings";
import Followers from "./components/Followers";
import Footer from "./components/Footer";

function App() {
    const [showHeader, setShowHeader] = useState(true);
    const [redirectTo, setRedirectTo] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if(session.get('user') && session.get('user')._id !== undefined) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div>
        <div className="wrapper">
        <BrowserRouter>
        
            {showHeader && <Header searchKeyword={searchKeyword} setSearchKeyword={text => setSearchKeyword(text)} loggedIn={loggedIn} onLogout={() => setLoggedIn(false)} />}
            {redirectTo && <Redirect push to={redirectTo}/>}
            
            <Switch>
                <Route exact path='/login' render={props => <Login onLogin={() => setLoggedIn(true)} />}/>
                <Route exact path='/signup' render={props => <Signup onLogin={() => setLoggedIn(true)} />}/>
                <Route exact path='/' render={props => <Posts searchKeyword={searchKeyword} />}/>
                <Route exact path='/mine' render={props => <MyPosts searchKeyword={searchKeyword} />}/>
                <Route exact path='/feed' render={props => <FollowingsPosts searchKeyword={searchKeyword} />}/>
                <Route exact path='/posts/:id' render={props => <PostPage />}/>
                <Route exact path='/users' render={props => <Users />}/>
                <Route exact path='/following' render={props => <Followings />}/>
                <Route exact path='/followers' render={props => <Followers />}/>
                <Route exact path='/users/:id' render={props => <UserPosts />}/>
                <Route exact path='/up' render={props => <UpdatePassword />}/>
                <Route exact path='/profile' render={props => <Profile />}/>
            </Switch>
                       
        </BrowserRouter>
        </div>
        <Footer />
        </div> 
    );
}

export default App;
