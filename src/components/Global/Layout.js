import React from 'react'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'

const Layout = ({ children, className }) => {




    return (
        <Container className="mt--7 responsive-container" fluid>
            <Row>
                <Col className={className} xl="12">
                    <Card className="bg-secondary shadow">
                        {children}
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Layout