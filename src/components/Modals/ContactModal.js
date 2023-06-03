import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Row, Col } from 'reactstrap'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material'
import { formReducer } from 'utils/globalFunction'
import CustomBtn from 'components/Global/CustomBtn'
import MerchantService from 'Services/MerchantService'
import { toast } from 'react-toastify'
import MultiSelect from 'components/Global/MultiSelect'
import { useSelector } from 'react-redux'


const ContactModal = ({ className, isModalOpen, handleClose, data }) => {

  const merchantLocations = useSelector(state => state.authUser.courseLocations);
  const [grant_user_access, setGrant_User_Access] = React.useState(false);
  const [formData, setFormData] = React.useReducer(formReducer, {});
  const [loading, setLoading] = React.useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if ((!formData['locations'] || formData['locations']?.length === 0) && !data) {
      toast("Please select atleast one location!", {
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
    let temp = {
      first_name: formData['fname'],
      middle_name: formData['mdname'] ?? null,
      last_name: formData['lname'],
      mobile_phone_no: formData['mphone'],
      work_phone_no: formData['wphone'],
      work_phone_extn: formData['ext'],
      personal_email_address: formData['pemail'],
      work_email_address: formData['wemail'],
      grant_user_access: grant_user_access,
      location_id: formData['locations']?.map(x => x.location_id)
    }
    console.log(temp)
    if (data) {
      MerchantService.updateMerchantContact(data?.contact_id, temp)
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
            resetState();
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
                type: 'error'
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
            type: 'error'
          })
          setLoading(false);
        })
    } else {
      MerchantService.createMerchantContact(temp)
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
            resetState();
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
                type: 'error'
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
            type: 'error'
          })
          setLoading(false);
        })
    }

  }
  const resetState = () => {
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
    if (data) {
      resetState();
      let items = [
        { target: { name: 'fname', value: data?.first_name } },
        { target: { name: 'mdname', value: data?.middle_name } },
        { target: { name: 'lname', value: data?.last_name } },
        { target: { name: 'ext', value: data?.work_phone_extn } },
        { target: { name: 'pemail', value: data?.personal_email_address } },
        { target: { name: 'wemail', value: data?.work_email_address } },
        { target: { name: 'mphone', value: data?.mobile_phone_no } }
      ]
      items?.map(x => setFormData(x))
      setGrant_User_Access(data?.grant_user_access);
    }
  }, [data])
  console.log(formData)
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
          {data ? 'Update' : "Add New"} Contact Details
        </ModalHeader>
        <form onSubmit={handleOnSubmit}>
          <ModalBody>
            <Row>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="First Name"
                  variant="outlined"
                  onChange={setFormData}
                  value={formData['fname'] ?? ""}
                  name='fname'
                  required
                />
              </Col>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="Middle Name"
                  variant="outlined"
                  onChange={setFormData}
                  value={formData['mdname'] ?? ""}
                  name='mdname'
                />
              </Col>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="Last Name"
                  variant="outlined"
                  onChange={setFormData}
                  value={formData['lname'] ?? ""}
                  required
                  name='lname'
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="Work Phone Extenstion"
                  variant="outlined"
                  placeholder="92"
                  onChange={setFormData}
                  value={formData['ext'] ?? ""}
                  required
                  name='ext'
                />
              </Col>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="Work Phone No"
                  variant="outlined"
                  placeholder="000-000-00000"
                  onChange={setFormData}
                  value={formData['wphone'] ?? ""}
                  required
                  name='wphone'
                  type={'number'}
                />
              </Col>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="Mobile Phone No"
                  variant="outlined"
                  placeholder="000-000-00000"
                  onChange={setFormData}
                  value={formData['mphone'] ?? ""}
                  required
                  type={'number'}
                  name='mphone'
                />
              </Col>
            </Row>
            <Row className='mt-lg-3'>
              <Col lg="6">
                <TextField
                  fullWidth={true}
                  label="Personal Email"
                  variant="outlined"
                  onChange={setFormData}
                  value={formData['pemail'] ?? ""}
                  required
                  type={'email'}
                  name='pemail'
                />
              </Col>
              <Col lg="6">
                <TextField
                  fullWidth={true}
                  label="Work Email"
                  variant="outlined"
                  onChange={setFormData}
                  value={formData['wemail'] ?? ""}
                  required
                  type={'email'}
                  name='wemail'
                />
              </Col>
            </Row>
            <Row className='mt-lg-3'>
              {!data &&
                <Col lg="6">
                  <MultiSelect
                    label="Select Locatios"
                    setValue={setFormData}
                    value={formData['locations'] ?? []}
                    name='locations'
                    data={merchantLocations}
                  />
                </Col>
              }
              <Col lg="6">
                <FormControlLabel control={<Checkbox checked={grant_user_access} onChange={(e) => setGrant_User_Access(e.target.checked)} />} label="Grant user access" />
              </Col>
            </Row>
            {/* <Row className='mt-lg-3'>
              <Col lg="6">
                <TextField
                  fullWidth={true}
                  label="Address 1"
                  required
                  variant="outlined"
                  onChange={setFormData}
                  value={formData['address1'] ?? ""}
                  name='address1'
                />
              </Col>
              <Col lg="6">
                <TextField
                  fullWidth={true}
                  label="Address 2"
                  variant="outlined"
                  className='responsive-input'
                  onChange={setFormData}
                  value={formData['address2'] ?? ""}
                  name='address2'
                />
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="City"
                  required
                  variant="outlined"
                  onChange={setFormData}
                  value={formData['city'] ?? ""}
                  name='city'
                />
              </Col>
              <Col lg="4">
                 <States
                    value={formData['state'] ?? ""}
                    onChange={setFormData}
                  />
              </Col>
              <Col lg="4">
                <TextField
                  fullWidth={true}
                  label="Zip"
                  required
                  variant="outlined"
                  onChange={setFormData}
                  name='zip'
                  value={formData['zip'] ?? ""}
                />
              </Col>
            </Row> */}
          </ModalBody>
          <ModalFooter>
            <CustomBtn
              loading={loading}
              title="Submit"
              type="submit"
            />
          </ModalFooter>
        </form>
      </Modal>
    </div >
  )
}

export default ContactModal
