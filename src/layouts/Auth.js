import React from 'react'
import AuthNavbar from 'components/Navbars/AuthNavbar.js'
import { Col, Container, Row } from 'reactstrap'

const Auth = ({ children }) => {

  React.useEffect(() => {
    document.body.classList.add('bg-default')
    return () => {
      document.body.classList.remove('bg-default')
    }
  }, [window.location.pathname])

  return (
    <>
      <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col>
                  <h1 className="text-white">EZ PAY UP</h1>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
        {/* Page content */}
        <Container className="mt-lg--8 pb-5" style={{ marginTop: '-5rem' }}>
          <Row className="justify-content-center">
            {children}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Auth
