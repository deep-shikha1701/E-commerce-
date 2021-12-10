import React, {useState} from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../Components/Layouts'
import Input from '../../Components/UI/input';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {signup} from '../../actions'




function Signup() {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()

    const userSignup = (e) =>{

        e.preventDefault();

        const user = {
            firstName,lastName,email, password
        }

        dispatch(signup(user));
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    if(user.loading){
        return <p>Loading...</p>
    }

    return (
        <div>
            <Layout>
                <Container>
                    {user.message}
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={userSignup}>
                                <Row>
                                    <Col md={6}>
                                        <Input
                                            type="text"
                                            label="First Name"
                                            placeholder="Enter First Name"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value = {firstName}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Input
                                            type="text"
                                            label="Last Name"
                                            placeholder="Enter Last Name"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value = {lastName}
                                        />
                                    </Col>
                                </Row>
                                <Input
                                    type="email"
                                    label="E-mail"
                                    placeholder="Enter e-mail address"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value = {email}
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
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
