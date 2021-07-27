import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import axios from 'axios';

function Register() {
  const [state, setState] = useState({
    email: '',
    password: '',
    emailIsInvalid: false,
    passwordIsInvalid: false
  })


  async function register() {
    try {
      await axios({
        method: 'post',
        url: '/users/register',
        data: {
          email: state.email,
          password: state.password
        }
      });
      
      window.location.href = '/login'
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setState({
          ...state,
          passwordIsInvalid: true
        })
      } else if (err.response && err.response.status === 409) {
        setState({
          ...state,
          emailIsInvalid: true
        })

      }
    }
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      emailIsInvalid: false,
      passwordIsInvalid: false
    })
  }

  return (
    <div className="login d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '34vh' }}>
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card bg="white" text="black">
              <Card.Body>
                <Card.Title>Steezy Studio</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        required
                        isInvalid={state.emailIsInvalid} 
                      />
                      <Form.Control.Feedback type="invalid">
                        Email is already registered.
                      </Form.Control.Feedback>
                    </InputGroup>
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
                        isInvalid={state.passwordIsInvalid}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid password
                      </Form.Control.Feedback>
                    </InputGroup>
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
