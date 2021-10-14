import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../Components/Layouts'
import Input from '../../Components/UI/input';



function Signup() {
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
                                        value=''
                                        placeholder="Enter First Name"
                                        onChange={() => { }}
                                        className='mb-3'
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        type="text"
                                        label="Last Name"
                                        value=''
                                        placeholder="Enter Last Name"
                                        className='mb-3'
                                    />
                                </Col>
                            </Row>
                            <Form>
                                <Input
                                    type="email"
                                    label="E-mail"
                                    value=''
                                    placeholder="Enter e-mail address"
                                    onChange={() => { }}
                                    className='mb-3'
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    value=''
                                    placeholder="Enter password"
                                    onChange={() => { }}
                                    className='mb-3'
                                />
                            </Form>
                            <Button variant="primary" size="sm" type="submit">
                                Submit
                            </Button>

                        </Col>
                    </Row>

                </Container>
            </Layout>
        </div>
    )
}

export default Signup
