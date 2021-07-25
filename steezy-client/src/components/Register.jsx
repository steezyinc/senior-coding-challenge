import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import axios from 'axios';

function Register() {
  const [state, setState] = useState({
    email: '',
    password: '',
    isInvalid: false
  })


  async function register() {
    try {
      const res = await axios({
        method: 'post',
        url: '/users/register',
        data: {
          email: state.email,
          password: state.password
        }
      });
      
      window.location.href = '/login'
    } catch (err) {
      // todo: helpful error message in form
      setState({
        ...state,
        isInvalid: true
      })
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login min-vh-100 d-flex flex-column justify-content-center align-items-center">
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
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                      required
                      isInvalid={state.isInvalid}/>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" size="md" onClick={register}>
                      Create Account
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
