// reactstrap components
import { Button, CardBody, FormGroup, Form, Row, Col } from 'reactstrap'
// core components
import UserHeader from 'components/Headers/UserHeader.js'
import React from 'react'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import AdminNavbar from 'components/Navbars/AdminNavbar'
import Layout from 'components/Global/Layout'
import Footer from 'components/Footer'
import { useSelector } from 'react-redux'
import CustomSelect from 'components/Global/CustomSelect'

const Profile = () => {
  const courses = useSelector(state => state.authUser.courses);

  return (
    <>
      <AdminNavbar
        brandText={"Broadcast Messages"}
      />
      <UserHeader />
      {/* Page content */}
      <Layout className="order-xl-1">
        <CardBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <TextField
                    fullWidth={true}
                    id="outlined-multiline-static"
                    label="Message*"
                    multiline
                    rows={4}
                    placeholder="Type a Message"
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="6">
                  <CustomSelect
                    label="Select Course *"
                    name='course'
                    data={courses ?? []}
                  />
                </Col>
              </Row>
              <br />
              <FormGroup>
                <Row>
                  <Col lg="6">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="SMS"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="WhatsApp"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Email"
                    />
                  </Col>
                </Row>
              </FormGroup>
            </div>

            <Row>
              <Col lg="6">
                <Button color="secondary">Reset</Button>
                <Button color="primary">Send</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Layout>
      <Footer containerStyle={{ position: 'absolute' }} />
    </>
  )
}

export default Profile
