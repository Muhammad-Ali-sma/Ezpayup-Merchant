// reactstrap components
import { CardBody, Form, Row, Col, FormText } from 'reactstrap'
import React, { useState, useEffect } from 'react'
// core components
import UserHeader from 'components/Headers/UserHeader.js'
import Location from 'components/Tables/Location'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Courses from 'components/Tables/Courses'
import LocationModal from 'components/Modals/LocationModal'
import EditMerchant from 'components/Modals/EditMerchant'
import EditIcon from '@mui/icons-material/Edit'
import PrintIcon from '@mui/icons-material/Print'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import { Checkbox, FormControlLabel, FormLabel, TextField } from '@mui/material'
import MerchantService from 'Services/MerchantService'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'components/Global/Loader'
import CourseModal from 'components/Modals/CourseModal'
import { setCourseLocations } from 'Redux/authSlice'
import { setCourses } from 'Redux/authSlice'
import AdminNavbar from 'components/Navbars/AdminNavbar'
import Footer from 'components/Footer'
import Contacts from 'components/Tables/Contacts'
import ContactModal from 'components/Modals/ContactModal'
import Layout from 'components/Global/Layout'

export const Profile = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState('');
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [merchantContacts, setMerchantContacts] = useState([]);
  const merchantId = useSelector(state => state.authUser.merchant_Id);



  const getMerchantData = () => {
    setIsLoaded(false);
    MerchantService.getMerchantById(merchantId)
      .then(res => {
        if (res.status === 'success') {
          setData(res.data)
        }
        setIsLoaded(true);
      })
      .catch(err => setIsLoaded(true))
  }
  const getMerchantLocation = () => {
    MerchantService.getMerchantLocations(merchantId)
      .then(res => {
        if (res.status === 'success') {
          dispatch(setCourseLocations(res.data));
        } else {
          dispatch(setCourseLocations([]));
        }
      })
      .catch(err => console.log(err))
  }
  const getMerchantCourses = () => {
    MerchantService.getMerchantCourses(merchantId)
      .then(res => {
        if (res.status === 'success') {
          dispatch(setCourses(res.data));
        } else {
          dispatch(setCourses([]));
        }
      })
      .catch(err => console.log(err))
  }
  const getMerchantContacts = () => {
    MerchantService.getMerchantContacts(merchantId)
      .then(res => {
        console.log(res)
        if (res.status === 'success') {
          setMerchantContacts(res.data);
        } else {
          setMerchantContacts([]);
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getMerchantData();
    getMerchantCourses();
    getMerchantLocation();
    getMerchantContacts();
    const controller = new AbortController();
    return () => controller.abort();
  }, [])

  return (
    <>
      <AdminNavbar
        brandText={"Merchant Profile"}
      />
      <UserHeader />
      {isLoaded ?
        <Layout className="order-xl-1">
          <CardBody>
            <Form>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormText className='label heading'>Merchant Name</FormText>
                    <FormLabel className='merchant-details' >{data?.merchant_business_name}</FormLabel >
                  </Col>
                </Row>
                {data?.merchant_website &&
                  <Row>
                    <Col lg="6">
                      <FormText className='label heading'>Merchant Website</FormText>
                      <FormLabel className='merchant-details' >{data?.merchant_website}</FormLabel >
                    </Col>
                  </Row>
                }
                <Row>
                  <Col lg="12">
                    <FormControlLabel control={<Checkbox checked={data?.is_accept_cc === 'Y' ? true : false} />} label="Accepting Credit Card Payments" />
                  </Col>
                  <Col lg="12">
                    <FormControlLabel control={<Checkbox checked={data?.is_accept_ach === 'Y' ? true : false} />} label="Accepting ACH  Payments" />
                  </Col>
                </Row>
                <Row>
                  <Col lg="11">
                    {data?.about_business &&
                      <>
                        <FormText className='label heading'>About the Merchant</FormText>
                        <TextField
                          className='disable-textarea'
                          fullWidth={true}
                          multiline
                          value={data?.about_business}
                          variant='standard'
                          disabled
                        />
                      </>
                    }
                  </Col>
                  <Col lg="1">
                    <EditIcon style={{ float: 'right' }} onClick={() => setModal('EditMerchantModal')} /> &nbsp;
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
              {/* location */}
              <h6 className="mb-4">
                <span className="label text-muted heading">Locations <AddCircleIcon style={{ color: '#32325d' }} onClick={() => setModal('AddLocationModal')} /></span>
                <span className="float-right">
                  <PrintIcon />
                  &nbsp;&nbsp;&nbsp;
                  <CloudDownloadIcon />
                </span>
              </h6>
              <Location
                getMerchantLocation={getMerchantLocation}
              />
              {/* courses */}
              <hr className="my-4" />
              <h6 className="mb-4">
                <span className="label text-muted heading">Courses <AddCircleIcon style={{ color: '#32325d' }} onClick={() => setModal('AddCourseModal')} /></span>
                <span className="float-right">
                  <PrintIcon />
                  &nbsp;&nbsp;&nbsp;
                  <CloudDownloadIcon />
                </span>
              </h6>
              <Courses
                merchantId={merchantId}
                getMerchantCourses={getMerchantCourses}
              />
              {/* contacts  */}
              <hr className="my-4" />
              <h6 className="mb-4">
                <span className="label text-muted heading">Contacts <AddCircleIcon style={{ color: '#32325d' }} onClick={() => setModal('AddContactModal')} /></span>
                <span className="float-right">
                  <PrintIcon />
                  &nbsp;&nbsp;&nbsp;
                  <CloudDownloadIcon />
                </span>
              </h6>
              <Contacts
                merchantId={merchantId}
                contacts={merchantContacts}
                getMerchantContacts={getMerchantContacts}
              />
              <hr className="my-4" />
            </Form>
          </CardBody>
        </Layout>
        :
        <Loader open={!isLoaded ? true : false} />
      }
      <CourseModal
        isModalOpen={modal === 'AddCourseModal' ? true : false}
        toggleModal={() => { getMerchantCourses(); setModal('') }}
      />
      <LocationModal
        isModalOpen={modal === 'AddLocationModal' ? true : false}
        handleClose={() => { getMerchantLocation(); setModal('') }}
      />
      <EditMerchant
        isModalOpen={modal === 'EditMerchantModal' ? true : false}
        toggleModal={() => { getMerchantData(); setModal('') }}
        handleClose={() => setModal('')}
        data={data}
      />
      <ContactModal
        isModalOpen={modal === 'AddContactModal' ? true : false}
        handleClose={() => { getMerchantContacts(); setModal('') }}
      />
      <Footer containerStyle={{ position: isLoaded ? 'static' : 'absolute' }} />
    </>
  )
}

export default Profile
