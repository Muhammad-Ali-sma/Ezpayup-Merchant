import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Row, Col } from 'reactstrap'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import CustomBtn from 'components/Global/CustomBtn'
import MerchantService from 'Services/MerchantService'
import { toast } from 'react-toastify'
import { changeLogoUrl } from 'Redux/authSlice'
import { useDispatch } from 'react-redux'

const MerchantModal = ({ className, isModalOpen, toggleModal, data, handleClose }) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [is_accept_cc, setIs_accept_cc] = useState(false);
  const [about_business, setabout_business] = useState('');
  const [is_accept_ach, setIs_accept_ach] = useState(false);
  const [merchantLogoUrl, setMerchantLogoUrl] = useState(null);
  const [merchant_website, setmerchant_website] = useState('');
  const [merchant_business_name, setmerchant_business_name] = useState('');

  const handleOnSubmit = () => {
    setLoading(true);
    if (merchantLogoUrl) {
      if (!merchantLogoUrl.includes('https://') || (/\.(jpg|jpeg|png|jfif|pjpeg|pjp)$/.test(merchantLogoUrl)) === false) {
        toast('Merchant logo url must starts with (https://) and must ends with (.jpg, .jpeg, .jfif, .pjpeg, .pjp or .png)', {
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
    }
    let temp = {
      merchant_business_name,
      merchant_business_logo_url: merchantLogoUrl,
      about_business,
      merchant_website,
      is_accept_cc: is_accept_cc ? 'Y' : 'N',
      is_accept_ach: is_accept_ach ? 'Y' : 'N',
    }
    MerchantService.updateMerchant(data.merchant_id, temp)
      .then(res => {
        console.log(res)
        if (res.status === 'success') {
          dispatch(changeLogoUrl(res.data.merchant_business_logo_url))
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
        toast("Error occured please try again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          type: 'error'
        })
      })
  }

  useEffect(() => {
    if (data) {
      setmerchant_business_name(data?.merchant_business_name)
      setabout_business(data?.about_business);
      setmerchant_website(data?.merchant_website);
      setMerchantLogoUrl(data?.merchant_business_logo_url);
      setIs_accept_cc(data?.is_accept_cc === 'Y' ? true : false);
      setIs_accept_ach(data?.is_accept_ach === 'Y' ? true : false);
    }
  }, [data])

  return (
    <div>
      <Modal
        style={{ width: '1200px' }}
        isOpen={isModalOpen}
        toggle={toggleModal}
        className={className}
        centered={true}
        size={'lg'}
      >
        <ModalHeader toggle={handleClose} className="modal-header-theme">
          Edit Merchant Details
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="12">
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Merchant Name *"
                variant="outlined"
                value={merchant_business_name}
                onChange={(e) => {
                  setmerchant_business_name(e.target.value)
                }}
              />
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col lg="12">
              <TextField
                fullWidth
                label="Merchant Business Logo Url"
                variant="outlined"
                onChange={(e) => setMerchantLogoUrl(e.target.value)}
                value={merchantLogoUrl}
              />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col lg="12">
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Merchant Website *"
                variant="outlined"
                value={merchant_website}
                onChange={(e) => {
                  setmerchant_website(e.target.value)
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={is_accept_cc} onChange={(e) => setIs_accept_cc(e.target.checked)} />} label="Accepting Credit Card Payments" />
                <FormControlLabel control={<Checkbox checked={is_accept_ach} onChange={(e) => setIs_accept_ach(e.target.checked)} />} label="Accepting ACH Payments" />
              </FormGroup>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col lg="12">
              <TextField
                fullWidth={true}
                label="About the Merchant *"
                multiline
                rows={4}
                placeholder="About the Merchant"
                value={about_business}
                onChange={(e) => {
                  setabout_business(e.target.value)
                }}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <CustomBtn
            loading={loading}
            onClick={handleOnSubmit}
            type="submit"
          />
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default MerchantModal;
