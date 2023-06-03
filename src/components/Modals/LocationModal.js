import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Row, Col } from 'reactstrap'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import MerchantService from 'Services/MerchantService'
import CustomBtn from 'components/Global/CustomBtn'
import { Checkbox, FormControlLabel } from '@mui/material'
import { toast } from 'react-toastify'
import States from 'components/Global/States'


const LocationModal = ({ className, isModalOpen, handleClose, data }) => {

  const merchantId = useSelector(state => state.authUser.merchant_Id);
  const [isMainLocation, setIsMainLocation] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [loading, setLoading] = useState(false);
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [state, setState] = useState('');
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (data) {
      let temp = {
        merchant_id: merchantId,
        location_name: locationName ?? data?.location_name,
        address1: address1 ?? data?.address1,
        address2: address2 ?? data?.address2,
        city: city ?? data?.city,
        state: state ?? data?.state,
        zip: zip ?? data?.zip,
        country: data?.country,
        is_main_location: isMainLocation ? 'Y' : 'N'
      }
      MerchantService.updateMerchantLocation(data?.location_id, temp)
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
      if (locationName && address1 && address2 && city && state && zip) {
        let temp = {
          location_name: locationName,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          country: 'USA',
          merchant_id: merchantId,
          is_main_location: isMainLocation ? 'Y' : 'N'
        }
        MerchantService.createMerchantLocation(temp)
          .then(res => {
            console.log(res)
            if (res.status === "success") {
              handleModalClose();
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
    setIsMainLocation(false);
    setLocationName('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setZip('');
    handleClose();
  }
  useEffect(() => {
    if (data) {
      setLocationName(data?.location_name);
      setAddress1(data?.address1);
      setAddress2(data?.address2);
      setState(data?.state);
      setCity(data?.city);
      setZip(data?.zip);
      setIsMainLocation(data?.is_main_location === 'Y' ? true : false)
    }
  }, [data])

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        toggle={handleModalClose}
        className={className}
        centered={true}
        size={'lg'}
      >
        <ModalHeader toggle={handleModalClose} className="modal-header-theme">
          {data ? 'Edit' : 'Create'} Location Details
        </ModalHeader>
        <form autoComplete="off" onSubmit={handleOnSubmit}>
          <ModalBody>
            <Row>
              <Col lg="6">
                <TextField
                  fullWidth={true}
                  label="Location Name"
                  variant="outlined"
                  value={locationName ?? ''}
                  required
                  onChange={(e) => {
                    setLocationName(e.target.value)
                  }}
                />
              </Col>
              <Col lg="6">
                <FormControlLabel control={<Checkbox checked={isMainLocation} onChange={(e) => setIsMainLocation(e.target.checked)} />} label="Is this your main location?" />
              </Col>
            </Row>
            <Row className='mt-lg-3'>
              <Col lg="6">
                <TextField
                  fullWidth={true}
                  label="Address 1"
                  required
                  variant="outlined"
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1 ?? ''}
                />
              </Col>
              <Col lg="6">
                <TextField
                  fullWidth={true}
                  label="Address 2"
                  variant="outlined"
                  className='responsive-input'
                  value={address2 ?? ''}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6 mt-3">
                <TextField
                  fullWidth={true}
                  label="City"
                  required
                  onChange={(e) => setCity(e.target.value)}
                  variant="outlined"
                  value={city ?? ''}
                />
              </Col>
              <Col lg="6 mt-3">
                <States
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6 mt-3">
                <TextField
                  fullWidth={true}
                  label="Zip"
                  required
                  variant="outlined"
                  value={zip ?? ''}
                  onChange={(e) => setZip(e.target.value)}
                />
              </Col>
              <Col lg="6 mt-3">
                <TextField
                  fullWidth={true}
                  label="Country"
                  required
                  variant="outlined"
                  disabled={true}
                  value={'USA'}
                />
              </Col>
            </Row>
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
    </>
  )
}

export default LocationModal
