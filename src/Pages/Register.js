// reactstrap components
import { Card, CardHeader, CardBody, FormGroup, InputGroup, Col, Label, } from 'reactstrap'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useHistory } from 'react-router-dom'
import CustomBtn from 'components/Global/CustomBtn'
import AuthService from 'Services/AuthService'
import States from 'components/Global/States'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'


const Register = () => {
  const [email, setEmail] = useState('')
  const [address1, setaddress1] = useState('')
  const [address2, setaddress2] = useState('')
  const [city, setcity] = useState('')
  const [state, setstate] = useState('')
  const [zip, setzip] = useState('')
  const [first_name, setfirst_name] = useState('')
  const [last_name, setlast_name] = useState('')
  const [mobile_phone_no, setmobile_phone_no] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [merchant_business_name, setmerchant_business_name] = useState('')
  const [conductingBusiness, setConductingBusiness] = useState('company')

  const [loading, setLoading] = useState(false);
  const history = useHistory()


  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!merchant_business_name || !address1 || !city || !state || !zip || !first_name || !last_name || !mobile_phone_no || !email || !conductingBusiness || !password) {
      setLoading(false);
      toast('Please fill mandatory fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'error'
      });
      return;
    }
    if (password !== cpassword) {
      setLoading(false);
      toast('Confirm password not match!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'error'
      });
      return;
    }

    let temp = {
      merchant_business_type: conductingBusiness,
      merchant_business_name: merchant_business_name,
      merchant_location: {
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
      },
      merchant_contact: {
        first_name: first_name,
        last_name: last_name,
        mobile_phone_no: mobile_phone_no,
      },
      merchant_user: {
        email: email,
        password: password,
      },
    }
    AuthService.Register(temp)
      .then(res => {
        console.log(res)
        if (res.status === 'success') {
          history.push('/login');
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
          setLoading(false);
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
          ));
          setLoading(false);
        }
      })
      .catch(err => {
        toast('Error occurred, please try again!');
        setLoading(false);
      })
  }

  return (
    <>
      <Col lg="12" md="8" className='mb-5'>
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent py-4">
            <div className="text-center">
              <h2> Sign Up </h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <form onSubmit={handleOnSubmit}>
              <FormGroup className="row mb-3">
                <div className="col-12">
                  <TextField
                    label="Business Name"
                    type="text"
                    onChange={(e) => setmerchant_business_name(e.target.value)}
                    id="merchant_business_name"
                    fullWidth={true}
                    required
                    name="merchant_business_name"
                  />
                </div>
              </FormGroup>
              <Label><b>Business Address :</b></Label>
              <FormGroup className="mb-3 row">
                <div className="col-lg-6 col-12">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="Address 1"
                      type="text"
                      onChange={(e) => setaddress1(e.target.value)}
                      id="address1"
                      required
                      fullWidth={true}
                      name="address1"
                      autoFocus
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-6 col-12 mt-lg-0 mt-3">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="Address 2"
                      type="text"
                      onChange={(e) => setaddress2(e.target.value)}
                      id="address2"
                      fullWidth={true}
                      name="address2"
                      autoFocus
                    />
                  </InputGroup>
                </div>
              </FormGroup>
              <FormGroup className="mb-3 row">
                <div className="col-lg-4 col-12">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="City"
                      type="text"
                      onChange={(e) => setcity(e.target.value)}
                      required
                      id="city"
                      fullWidth={true}
                      name="city"
                      autoFocus
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                  <States
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                  />
                </div>
                <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="zip"
                      type="text"
                      onChange={(e) => setzip(e.target.value)}
                      id="zip"
                      fullWidth={true}
                      name="zip"
                      autoFocus
                      required
                    />
                  </InputGroup>
                </div>
              </FormGroup>
              <Label><b>Contact Info :</b></Label>
              <FormGroup className="row mb-3">
                <div className="col-lg-4 col-12">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      required
                      label="First Name"
                      onChange={(e) => setfirst_name(e.target.value)}
                      id="first_name"
                      fullWidth={true}
                      name="first_name"
                      autoFocus
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      required
                      label="Last Name"
                      type="text"
                      fullWidth={true}
                      onChange={(e) => setlast_name(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      required
                      label="Contact No"
                      type="number"
                      onChange={(e) => setmobile_phone_no(e.target.value)}
                      id="mobile_phone_no"
                      fullWidth={true}
                      name="mobile_phone_no"
                      autoFocus
                    />
                  </InputGroup>
                </div>
              </FormGroup>
              <Label><b>Login Credentials :</b></Label>
              <FormGroup className="mb-2 row">
                <div className="col-lg-4 col-12">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      required
                      label="Email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      fullWidth={true}
                      name="email"
                      autoFocus
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="Password"
                      type="password"
                      required
                      fullWidth={true}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div className="col-lg-4 col-12 mt-lg-0 mt-3">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="Confirm Password"
                      type="password"
                      required
                      fullWidth={true}
                      onChange={(e) => setcpassword(e.target.value)}
                    />
                  </InputGroup>
                </div>
              </FormGroup>
              <Label className="mt-2"><b>Conducting Business as :</b></Label>
              <FormGroup className="row">
                <div className="col-12">
                  <RadioGroup
                    onChange={(e) => setConductingBusiness(e.target.value)}
                    required
                    sx={{ fontWeight: '600', flexDirection: 'row' }}
                  >
                    <FormControlLabel value="company" control={<Radio checked={conductingBusiness == 'company' ? true : false} style={{ color: conductingBusiness === 'company' ? '#5e72e4' : '#cad1d7' }} />} label="Company" />
                    <FormControlLabel value="individual" control={<Radio checked={conductingBusiness == 'individual' ? true : false} style={{ color: conductingBusiness === 'individual' ? '#5e72e4' : '#cad1d7' }} />} label="Individual" />
                    <FormControlLabel value="non_profit" control={<Radio checked={conductingBusiness == 'non_profit' ? true : false} style={{ color: conductingBusiness === 'non_profit' ? '#5e72e4' : '#cad1d7' }} />} label="Non-Profit" />
                  </RadioGroup>
                </div>
              </FormGroup>
              <div className="text-center mt-4">
                <CustomBtn
                  color="primary"
                  type="submit"
                  title="Register"
                  loading={loading}
                />
              </div>
            </form>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default Register
