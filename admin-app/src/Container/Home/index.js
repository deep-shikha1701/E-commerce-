import React from 'react'
import Layout from '../../Components/Layouts';
import { Row, Col, Container } from 'react-bootstrap';
import './style.css';

function Home() {




    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">Sidebar</Col>
                    <Col md={10} style={{ marginLeft: 'auto' }}>Container</Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Home
