import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Button, Navbar, Container, Nav } from 'react-bootstrap';

import Login from './components/Login'
import Classes from './components/Classes'
import Register from './components/Register'
import VideoPlayer from './components/VideoPlayer'

function App() {
  const [isAuthed, checkAuth] = useState(false);

  useEffect(() => {
    checkAuth(() => (localStorage.getItem("jwt") !== null))
  }, [])

  function handleLogin(jwt) {
    localStorage.setItem("jwt", jwt)
    checkAuth(true)
    window.location.href ='/classes'
  }

  function handleLogInAndOut() {
    if (isAuthed) {
      localStorage.clear();
      checkAuth(() => false)
    }

    window.location.href ='/login'
  }

  return (
    <div className="App min-vh-100">
      <Router>
        <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">STEEZY SAMPLE APP</Navbar.Brand>
            <Nav.Link href="/classes">Classes</Nav.Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button variant="link" href="#" onClick={handleLogInAndOut}>
                  { isAuthed ? 'Logout': 'Login' }
                </Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

          <Switch>
            <Route exact path="/">
              <Classes />
            </Route>
            <Route exact path="/classes">
              <Classes />
            </Route>
            <Route exact path="/classes/:classId">
              <VideoPlayer />
            </Route>
            <Route path="/login">
              <Login 
                handleLogin= {handleLogin}
              />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="*">
              <Classes />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
