import React from 'react'
import Layout from '../../Components/Layouts';
import { Container, Jumbotron } from 'react-bootstrap'

function Home() {
    return (
        <Layout>
            <Container>
                <div style={{margin:'5rem',}} className="jumbotron text-center" >
                    <h1>Welcome to Admin Dashboard</h1>
                </div>
            </Container>
        </Layout>
    )
}

export default Home
