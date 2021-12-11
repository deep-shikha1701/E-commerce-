import React from 'react'
import Layout from '../../Components/Layouts';
import { Row, Col, Container } from 'react-bootstrap';
import './style.css';
import { NavLink } from 'react-router-dom';

function Home() {

    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">
                        <ul>
                            <li><NavLink to={`/`}>Home</NavLink></li>
                            <li><NavLink to={`/products`}>Products</NavLink></li>
                            <li><NavLink to={`/orders`}>Orders</NavLink></li>
                        </ul>
                    </Col>
                    <Col md={10} style={{ marginLeft: 'auto' }}>Container</Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Home
