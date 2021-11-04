import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../Components/Layouts';
import Input from '../../Components/UI/input';
import { login } from '../../actions/index';
import { useDispatch } from 'react-redux';

const Signin = (props) => {

    const dispatch = useDispatch();

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email: 'test@example.com',
            password:'123456'
        }   

        dispatch(login(user));  
    }


    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userLogin}>
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

export default Signin
