import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../Components/Layouts';
import Input from '../../Components/UI/input';
import { login } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth)

    const dispatch = useDispatch();
    
    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email,
            password
        }

        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`}/>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='mb-3'
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
