import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../Components/Layouts'
import Input from '../../Components/UI/input';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';




function Signup() {

    const auth = useSelector(state => state.auth);

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Row>
                                <Col>
                                    <Input
                                        type="text"
                                        label="First Name"
                                        placeholder="Enter First Name"
                                        onChange={() => { }}
                                        className='mb-3'
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        type="text"
                                        label="Last Name"
                                        placeholder="Enter Last Name"
                                        className='mb-3'
                                    />
                                </Col>
                            </Row>
                            <Form>
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Enter e-mail address"
                                    onChange={() => { }}
                                    className='mb-3'
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    onChange={() => { }}
                                    className='mb-3'
                                />
                                <Button variant="primary" size="sm" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>

                </Container>
            </Layout>
        </div>
    )
}

export default Signup
