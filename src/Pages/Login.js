// reactstrap components
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardBody, FormGroup, InputGroup, Col } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import AuthService from 'Services/AuthService'
import { loginAuth } from 'Redux/authSlice'
import { toast } from 'react-toastify'
import CustomBtn from 'components/Global/CustomBtn'

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [url, setUrl] = useState(null);
  const [email, setEmail] = useState('');
  const [seconds, setSeconds] = useState(8);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast("Email is required!", {
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
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast("Invalid Email!", {
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
    if (!password) {
      toast("Password is required!", {
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
      email,
      password,
    }

    AuthService.Login(temp)
      .then(res => {
        console.log(res)
        if (res.status === "success") {
          if (res.data?.accessToken) {
            dispatch(loginAuth({ merchant_Id: res.data.merchantId, token: res.data.accessToken, userData: { userId: res.data.user_id, user_name: res.data.contact_name, email: res.data.email, merchantLogoUrl: res.data?.merchant_logo_url } }))
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
            history.push('/merchant-profile');
          } else if (res.data?.accountLinksUrl) {
            setUrl(res.data?.accountLinksUrl);
            setCountDown(true);
          }
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
          setLoading(false);
        }
      })
      .catch(err => setLoading(false))
  }

  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      } if (seconds === 0 && url) {
        window.location.href = url;
      }
    }, 1000)
    return () => {
      clearInterval(myInterval)
    }
  })

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2">
              <h2>Login</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4"></div>
            {!countDown ?
              <form onSubmit={handleOnSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="Email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      fullWidth={true}
                      name="email"
                      autoFocus
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <TextField
                      label="Password"
                      type="password"
                      required
                      fullWidth={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <CustomBtn
                    title={"Login"}
                    type="submit"
                    className="my-4"
                    loading={loading}
                  />
                </div>
              </form>
              :
              <p className="text-center">You will have to complete Stripe Onboarding process fully before logging into the portal. Redirecting in {seconds} second{seconds > 1 ? "s" : ""}</p>
            }
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default Login
