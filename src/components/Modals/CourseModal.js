import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Row, Col, } from 'reactstrap'
import TextField from '@mui/material/TextField'
import CustomBtn from 'components/Global/CustomBtn'
import { useSelector } from 'react-redux'
import MerchantService from 'Services/MerchantService'
import { GithubPicker, TwitterPicker } from 'react-color'
import { FormLabel } from '@mui/material'
import { toast } from 'react-toastify'

const CourseModal = ({ className, isModalOpen, toggleModal, data }) => {

  const merchantId = useSelector(state => state.authUser.merchant_Id);
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!selectedColor) {
      toast('Course calendar color is required!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'error'
      })
      setLoading(false);
      return;
    }
    if (data) {
      let temp = {
        merchant_id: merchantId,
        course_calendar_color_hex: selectedColor?.replace('#', '') ?? data?.course_calendar_color_hex,
        course_name: courseName ?? data?.course_name,
        course_description: courseDescription ?? data?.course_description,
      }
      MerchantService.updateMerchantCourse(data?.course_id, temp)
        .then(res => {
          console.log(res)
          if (res.status === 'success') {
            res.message?.map(x => (
              toast(x, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                type: 'success'
              })
            ))
            toggleModal();
          } else {
            res.message?.map(x => (
              toast(x, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                type: 'error'
              })
            ))
          }
          setLoading(false);
        })
        .catch(err => {
          toast('Error occured please try again!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: 'error'
          })
          setLoading(false);
        })
    } else {
      if (courseName && courseDescription && selectedColor) {
        let temp = {
          merchant_id: merchantId,
          course_calendar_color_hex: selectedColor?.replace('#', ''),
          course_name: courseName,
          course_description: courseDescription,
        }

        MerchantService.createMerchantCourse(temp)
          .then(res => {
            console.log(res)
            if (res.status === 'success') {
              res.message?.map(x => (
                toast(x, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  type: 'success'
                })
              ))
              handleModalClose();
            } else {
              res.message?.map(x => (
                toast(x, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  type: 'error'
                })
              ))
            }
            setLoading(false);
          })
          .catch(err => {
            toast('Error occured please try again!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: 'error'
            })
            setLoading(false);
          })
      }
    }
  }

  const handleModalClose = () => {
    setCourseDescription('');
    setCourseName('');
    setSelectedColor('');
    toggleModal();
  }

  useEffect(() => {
    if (data) {
      setCourseDescription(data?.course_description);
      setCourseName(data?.course_name);
      setSelectedColor(data?.course_calendar_color_hex);
    }
  }, [data])

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        toggle={handleModalClose}
        className={className}
        centered={true}
        size={'lg'}
      >
        <ModalHeader toggle={handleModalClose} className="modal-header-theme">
          {data ? 'Edit' : 'Create'} Course Details
        </ModalHeader>
        <form onSubmit={handleOnSubmit}>
          <ModalBody>
            <Row>
              <Col lg="12">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Course Name"
                  variant="outlined"
                  value={courseName}
                  required
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col lg="12">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Course Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={courseDescription}
                  required
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col lg="12">
                <FormLabel>Course background color for the Calendar *</FormLabel>
                <GithubPicker
                  onChange={(e) => setSelectedColor(e.hex)}
                  color={selectedColor}
                  colors={['#eb9694', '#5300eb', '#004dcf', '#1273de', '#006b76', '#008b02', '#fccb00', '#db3e00', '#b80000']}
                  triangle={'hide'}
                  width="fit-content"
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <CustomBtn
              loading={loading}
              title={'Submit'}
              type="submit"
            />
          </ModalFooter>
        </form>
      </Modal>
    </div>
  )
}

export default CourseModal;