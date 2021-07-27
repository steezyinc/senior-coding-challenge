import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import axios from 'axios';

function Login({ handleLogin }) {
  const [state, setState] = useState({
    email: '',
    password: '',
    isInvalid: false
  })


  async function requestJwt() {
    try {
      const res = await axios({
        method: 'post',
        url: '/users/login',
        data: {
          email: state.email,
          password: state.password
        }
      });
      
      const { jwt } = res.data
      handleLogin(jwt)
    } catch (err) {
      setState({
        ...state,
        isInvalid: true
      })
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      isInvalid: false
    })
  }

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center">
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card bg="white" text="black">
              <Card.Body>
                <Card.Title>Steezy Studio</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                      required
                      isInvalid={state.isInvalid}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        required
                        isInvalid={state.isInvalid}/>
                        <Form.Control.Feedback type="invalid">
                          Incorrect email or password
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" size="md" onClick={requestJwt}>
                      LOG IN
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Header>Don't have an account?
                <Button variant="link" onClick={() => {window.location.href = '/register'}}>
                  Sign up
                </Button>
              </Card.Header>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
