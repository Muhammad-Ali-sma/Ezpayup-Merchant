import React from 'react'
import { Modal, ModalHeader, ModalBody, FormGroup, Container, Row, Col, FormText } from 'reactstrap'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import { formReducer } from 'utils/globalFunction'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import MerchantService from 'Services/MerchantService'
import { useSelector } from 'react-redux'
import CustomSelect from 'components/Global/CustomSelect'
import { FormControlLabel, IconButton, Radio, RadioGroup, Badge, InputLabel, FormLabel } from '@mui/material'
import CustomBtn from 'components/Global/CustomBtn'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import { enumerateDaysBetweenDates } from 'utils/globalFunction'


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  defaultBadge: {
    backgroundColor: 'white',
    color: 'black',
  },
  selectedBadge: {
    backgroundColor: '#5e72e4',
    color: 'white',
  },
  darkTheme: {
    backgroundColor: 'black',
    color: 'white',
  },
  disabledBadge: {
    backgroundColor: '#737683',
    color: 'white'
  }
}))

const AddScheduleModal = ({ className, isModalOpen, toggleModal, eventData, merchantId, currentView, getSchedules, selectedLocation }) => {

  const [formData, setFormData] = React.useReducer(formReducer, {});
  const darkMode = useSelector(state => state.authUser.darkMode);
  const courses = useSelector(state => state.authUser.courses);
  const [weeklyDays, setWeeklyDays] = React.useState([])
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();



  const handleCourseType = (day) => {
    weeklyDays.includes(day)
      ? setWeeklyDays([...weeklyDays.filter((item) => day != item)])
      : setWeeklyDays(weeklyDays.concat(day))
  }

  const addSchedule = () => {
    setLoading(true);
    if (formData['course'] && formData['startTime'] && formData['endTime'] && formData['totalSpots'] && formData['courseMode'] && formData['fees']) {
      let temp = {
        merchant_id: merchantId,
        location_id: selectedLocation?.location_id,
        course_id: formData['course'],
        fees: formData['fees'],
        total_spots: formData['totalSpots'],
        course_mode: formData['courseMode'],
        is_charge_customer_processing_fee: formData['processingFee'] === 'on' ? 'Y' : 'N',
        start_date: formData['startDate'] ? moment(formData['startDate']).format('YYYY-MM-DD') : null,
        end_date: formData['endDate'] ? moment(formData['endDate']).format('YYYY-MM-DD') : null,
        start_time: moment(formData['startTime']).format('HH:mm'),
        end_time: moment(formData['endTime']).format('HH:mm')
      }
      if (currentView === 'dayGridMonth') {
        if (formData['startDate'] && formData['endDate']) {
          if (eventData?.extendedProps?.schedule_id) {
            MerchantService.updateMerchantMonthlySchedule(eventData?.extendedProps?.schedule_id, temp)
              .then(res => {
                console.log('updateMerchantMonthlySchedule', res)
                if (res.status === 'success') {
                  getSchedules()
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'success',
                    })
                  ))
                  handleClose();
                } else {
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'error',
                    })
                  ))
                }
                setLoading(false);
              })
              .catch(err => {
                toast("Error occured please try again!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  type: 'error',
                });
                setLoading(false);
              })
          } else {
            MerchantService.createMerchantMonthlySchedule(temp)
              .then(res => {
                console.log('createMerchantMonthlySchedule', res)
                if (res.status === 'success') {
                  getSchedules()
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'success',
                    })
                  ))
                  handleClose();
                } else {
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'error',
                    })
                  ))
                }
                setLoading(false);
              })
              .catch(err => {
                toast("Error occured please try again!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  type: 'error',
                });
                setLoading(false);
              })
          }
        } else {
          toast('Please fill all the required fields!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: 'error',
          });
          setLoading(false);
        }
      } else {
        if (weeklyDays.length > 0 && formData['billingType']) {
          let data = {
            ...temp,
            week_day: weeklyDays,
            billing_type_code: formData['billingType']
          }
          if (eventData?.extendedProps?.schedule_id) {
            MerchantService.updateMerchantWeeklySchedule(eventData?.extendedProps?.schedule_id, data)
              .then(res => {
                console.log('updateMerchantWeeklySchedule', res)
                if (res.status === 'success') {
                  getSchedules();
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'success',
                    })
                  ))
                  handleClose();
                } else {
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'error',
                    })
                  ))
                }
                setLoading(false);
              })
              .catch(err => {
                toast("Error occured please try again!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  type: 'error',
                });
                setLoading(false);
              })
          } else {
            MerchantService.createMerchantWeeklySchedule(data)
              .then(res => {
                console.log('createMerchantWeeklySchedule', res)
                if (res.status === 'success') {
                  getSchedules();
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'success',
                    })
                  ))
                  handleClose();
                } else {
                  res.message?.map(x => (
                    toast(x, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      type: 'error',
                    })
                  ))
                }
                setLoading(false);
              })
              .catch(err => {
                toast("Error occured please try again!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  type: 'error',
                });
                setLoading(false);
              })
          }
        } else {
          toast('Please fill all the required fields!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: 'error',
          });
          setLoading(false);
        }
      }
    } else {
      toast('Please fill all the required fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'error',
      });
      setLoading(false);
    }
  }

  const handleOnDelete = () => {
    MerchantService.deleteMerchantSchedule(eventData?.extendedProps?.schedule_id)
      .then(res => {
        console.log('deleteMerchantSchedule', res)
        if (res.status === 'success') {
          getSchedules();
          res.message?.map(x => (
            toast(x, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              type: 'success',
            })
          ))
          resetState();
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
              type: 'error',
            })
          ))
        }
      })
      .catch(err => {
        toast("Error occured please try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          type: 'error',
        });
      })
  }


  const handleClose = () => {
    resetState();
    toggleModal();
  }
  const resetState = () => {
    setWeeklyDays([]);
    Object.keys(formData)?.map(x => {
      let item = {
        target: {
          name: x,
          value: x == 'startTime' ? null : ''
        }
      }
      setFormData(item)
    })
  }

  React.useEffect(() => {
    if (eventData) {
      resetState();
      let items = [{
        target: {
          name: 'startDate',
          value: currentView === 'timeGridWeek' ? (eventData?.extendedProps?.start_date ?? null) : eventData?.start
        }
      },
      {
        target: {
          name: 'endDate',
          value: currentView === 'timeGridWeek' ? eventData?.extendedProps?.end_date ?? null : (eventData?.end ? (eventData?.extendedProps?.end_date ?? moment(eventData?.end).subtract(1, 'day')) : eventData?.start)
        }
      },
      {
        target: {
          name: 'startTime',
          value: currentView === 'timeGridWeek' ? eventData?.start : (eventData?.extendedProps?.schedule_id ? moment(eventData?.start, 'hh:mm A').toDate() : null)
        }
      },
      {
        target: {
          name: 'endTime',
          value: currentView === 'timeGridWeek' ? eventData?.end : (eventData?.extendedProps?.schedule_id ? moment(eventData?.end, 'hh:mm A').toDate() : null)
        }
      }]
      items?.map(x => setFormData(x))

      const dates = enumerateDaysBetweenDates(eventData?.start, eventData?.end);
      dates.map(x => { setWeeklyDays((prev) => prev.concat(moment(x === 'THR' ? 'THU' : x).format('ddd')?.toUpperCase())) })
      if (eventData?.extendedProps) {
        let items = [
          { target: { name: 'location', value: eventData?.extendedProps?.location } },
          { target: { name: 'course', value: eventData?.extendedProps?.course } },
          { target: { name: 'totalSpots', value: eventData?.extendedProps?.total_spots } },
          { target: { name: 'courseMode', value: eventData?.extendedProps?.course_mode } },
          { target: { name: 'billingType', value: eventData?.extendedProps?.billing_type_code } },
          { target: { name: 'fees', value: eventData?.extendedProps?.fees } }
        ]
        items?.map(x => setFormData(x))
      }
    }
  }, [eventData])

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        toggle={handleClose}
        className={className}
        centered={true}
        size={'lg'}
      >
        <ModalHeader toggle={handleClose} className="modal-header-theme">
          {currentView === 'dayGridMonth' ? 'One Time Schedule' : 'Recurring Schedule'}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="3" xs="12">
              <FormLabel>Selected Location</FormLabel>
            </Col>
            <Col lg="9" xs="12">
              <span style={{ color: '#5e72e4' }}>{selectedLocation?.name}</span>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col lg="3" />
            <Col lg="9">
              <CustomSelect
                label="Select Course *"
                name='course'
                handleChange={setFormData}
                defaultVal={formData['course']}
                data={courses ?? []}
              />
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg="3"><FormLabel>Course Type * :</FormLabel></Col>
            {currentView === 'dayGridMonth' ?
              <Col lg="9" >
                <p style={{ color: darkMode ? 'white' : 'black', marginBottom: -5, marginTop: -5 }}>One Time Course</p>
              </Col>
              :
              <Col lg="9" >
                <Container
                  style={{
                    border: 'solid',
                    borderColor: 'lightgrey',
                    height: '100px',
                    borderWidth: 'thin',
                    textAlign: 'center'
                  }}
                  className='course_type_container'
                >
                  <p style={{ color: darkMode ? 'white' : 'black', textAlign: 'left' }}>Recurring Weekly</p>
                  <IconButton
                    onClick={(s) => handleCourseType('SUN')}
                    disabled={eventData?.extendedProps?.schedule_id ? true : false}
                  >
                    <Badge
                      badgeContent="SUN"
                      classes={{
                        badge: weeklyDays.includes('SUN')
                          ? (eventData?.extendedProps?.schedule_id ? classes.disabledBadge : classes.selectedBadge)
                          : (darkMode ? classes.darkTheme : classes.defaultBadge),
                      }}
                    ></Badge>
                  </IconButton>
                  <IconButton
                    disabled={eventData?.extendedProps?.schedule_id ? true : false}
                    onClick={(s) => handleCourseType('MON')}
                    sx={{ ml: { sm: '10%', xs: '8%' } }}
                  >
                    <Badge
                      badgeContent="MON"
                      classes={{
                        badge: weeklyDays.includes('MON')
                          ? (eventData?.extendedProps?.schedule_id ? classes.disabledBadge : classes.selectedBadge)
                          : (darkMode ? classes.darkTheme : classes.defaultBadge),
                      }}
                    ></Badge>
                  </IconButton>
                  <IconButton
                    disabled={eventData?.extendedProps?.schedule_id ? true : false}
                    onClick={(s) => handleCourseType('TUE')}
                    sx={{ marginLeft: { sm: '10%', xs: '8%' } }}
                  >
                    <Badge
                      badgeContent="TUE"
                      classes={{
                        badge: weeklyDays.includes('TUE')
                          ? (eventData?.extendedProps?.schedule_id ? classes.disabledBadge : classes.selectedBadge)
                          : (darkMode ? classes.darkTheme : classes.defaultBadge),
                      }}
                    ></Badge>
                  </IconButton>
                  <IconButton
                    disabled={eventData?.extendedProps?.schedule_id ? true : false}
                    onClick={(s) => handleCourseType('WED')}
                    sx={{ marginLeft: { sm: '10%', xs: '8%' } }}
                  >
                    <Badge
                      badgeContent="WED"
                      classes={{
                        badge: weeklyDays.includes('WED')
                          ? (eventData?.extendedProps?.schedule_id ? classes.disabledBadge : classes.selectedBadge)
                          : (darkMode ? classes.darkTheme : classes.defaultBadge),
                      }}
                    ></Badge>
                  </IconButton>
                  <IconButton
                    disabled={eventData?.extendedProps?.schedule_id ? true : false}
                    onClick={(s) => handleCourseType('THU')}
                    sx={{ marginLeft: { sm: '10%', xs: '8%' } }}
                  >
                    <Badge
                      badgeContent="THU"
                      classes={{
                        badge: weeklyDays.includes('THU')
                          ? (eventData?.extendedProps?.schedule_id ? classes.disabledBadge : classes.selectedBadge)
                          : (darkMode ? classes.darkTheme : classes.defaultBadge),
                      }}
                    ></Badge>
                  </IconButton>
                  <IconButton
                    disabled={eventData?.extendedProps?.schedule_id ? true : false}
                    onClick={(s) => handleCourseType('FRI')}
                    sx={{ marginLeft: { sm: '10%', xs: '8%' } }}
                  >
                    <Badge
                      badgeContent="FRI"
                      classes={{
                        badge: weeklyDays.includes('FRI')
                          ? (eventData?.extendedProps?.schedule_id ? classes.disabledBadge : classes.selectedBadge)
                          : (darkMode ? classes.darkTheme : classes.defaultBadge),
                      }}
                    ></Badge>
                  </IconButton>
                  <IconButton
                    disabled={eventData?.extendedProps?.schedule_id ? true : false}
                    onClick={(s) => handleCourseType('SAT')}
                    sx={{ marginLeft: { sm: '10%', xs: '8%' } }}
                  >
                    <Badge
                      badgeContent="SAT"
                      classes={{
                        badge: weeklyDays.includes('SAT')
                          ? (eventData?.extendedProps?.schedule_id ? classes.disabledBadge : classes.selectedBadge)
                          : (darkMode ? classes.darkTheme : classes.defaultBadge),
                      }}
                    ></Badge>
                  </IconButton>
                </Container>
              </Col>
            }
          </Row>
          <Row className='mt-3' >
            <Col lg="3" ><FormLabel>Course Timings * :</FormLabel></Col>
            <Col lg="4" sm='6' xs="12" >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={formData['startDate']}
                  onChange={(value) => {
                    let item = {
                      target: {
                        name: 'startDate',
                        value
                      }
                    }
                    setFormData(item)
                  }}

                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Col>
            <Col lg="4" sm='6' xs="12" className='mt-md-0 mt-3'>
              <LocalizationProvider style={{ width: '100%' }} dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  value={formData['endDate']}
                  onChange={(value) => {
                    let item = {
                      target: {
                        name: 'endDate',
                        value
                      }
                    }
                    setFormData(item)
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg="3" />
            <Col lg="4" sm='6' xs="12" className='mt-md-1 mt-2'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                fullWidth={true}
              >
                <TimePicker
                  label="Start Time"
                  value={formData['startTime']}
                  onChange={(value) => {
                    let item = {
                      target: {
                        name: 'startTime',
                        value
                      }
                    }
                    setFormData(item)
                  }}
                  renderInput={(params) => <TextField fullWidth style={{ height: '40px' }} {...params} />}
                />
              </LocalizationProvider>
            </Col>
            <Col lg="4" sm='6' xs="12" className='mt-md-1 mt-3'>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                fullWidth={true}
                style={{ width: '100%' }}
              >
                <TimePicker
                  label="End Time"
                  value={formData['endTime']}
                  onChange={(value) => {
                    let item = {
                      target: {
                        name: 'endTime',
                        value
                      }
                    }
                    setFormData(item)
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col lg="3"><FormLabel>Course Mode * :</FormLabel></Col>
            <Col lg="9">
              <FormGroup>
                <FormControl>
                  <RadioGroup
                    name="courseMode"
                    onChange={setFormData}
                    className='custom-radio'
                    sx={{ fontWeight: '600' }}
                  >
                    <FormControlLabel value="online" control={<Radio checked={formData['courseMode'] == 'online' ? true : false} style={{ color: formData['courseMode'] === 'online' ? '#5e72e4' : '#cad1d7' }} />} label="Online" />
                    <FormControlLabel value="in_person" control={<Radio checked={formData['courseMode'] == 'in_person' ? true : false} style={{ color: formData['courseMode'] === 'in_person' ? '#5e72e4' : '#cad1d7' }} />} label="In Person" />
                  </RadioGroup>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row className='mt--2'>
            <Col lg="3"><FormLabel>Billing Type * :</FormLabel></Col>
            <Col lg="9">
              <FormGroup>
                <FormControl>
                  <RadioGroup
                    name="billingType"
                    onChange={setFormData}
                    className='custom-radio'
                    sx={{ fontWeight: '600' }}
                  >

                    {currentView === 'dayGridMonth' ?
                      <p style={{ color: darkMode ? 'white' : 'black', marginBottom: -5, marginTop: -5 }}>One Time Charge</p>
                      :
                      <>
                        <FormControlLabel className='mt-sm-0 mt-2' value="CALCULATE_MONTHLY" control={<Radio checked={formData['billingType'] === 'CALCULATE_MONTHLY' ? true : false} style={{ color: formData['billingType'] === 'CALCULATE_MONTHLY' ? '#5e72e4' : '#cad1d7' }} />} label="Charged Monthly - Varies based on no of classes" />
                        <FormControlLabel className='mt-sm-0 mt-1' value="FIXED_MONTHLY" control={<Radio checked={formData['billingType'] == 'FIXED_MONTHLY' ? true : false} style={{ color: formData['billingType'] === 'FIXED_MONTHLY' ? '#5e72e4' : '#cad1d7' }} />} label="Charged Monthly - Fixed" />
                      </>
                    }
                  </RadioGroup>
                </FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row className='mt--2'>
            <Col lg="3"></Col>
            <Col lg="4" md="12">
              <TextField
                label={formData['billingType'] === 'CALCULATE_MONTHLY' ? "Fees per session" : 'Fixed Fees'}
                variant="outlined"
                name='fees'
                onChange={setFormData}
                value={formData['fees']}
                required
                fullWidth={true}
              />
            </Col>
            <Col lg="4" md="12" className='mt-lg-0 mt-3'>
              <TextField
                fullWidth
                label="No of Spots"
                variant="outlined"
                name='totalSpots'
                onChange={setFormData}
                value={formData['totalSpots']}
                required
              />
            </Col>
          </Row>
          <Row className='mt-1 mb-1'>
            <Col lg="3"></Col>
            <Col lg='9' xs="12"><span style={{ color: darkMode ? '#9da8c5' : '#525f7f' }}><Checkbox name='processingFee' onChange={setFormData} /> Charge Processing Fee to Customer</span></Col>
          </Row>
          <Row >
            <Col xs='6'>
              {eventData?.extendedProps?.schedule_id &&
                <CustomBtn
                  title='Delete'
                  onClick={handleOnDelete}
                  color='danger'
                  style={{ float: 'right' }}
                />
              }
            </Col>
            <Col xs='6'>
              <span style={{ float: 'right' }}>
                <CustomBtn
                  title='Submit'
                  onClick={addSchedule}
                  loading={loading}

                />
              </span>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddScheduleModal;
