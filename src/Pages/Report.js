// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap'
// core components
import UserHeader from 'components/Headers/UserHeader.js'
import AdminNavbar from 'components/Navbars/AdminNavbar'
import Footer from 'components/Footer'
import Layout from 'components/Global/Layout'

const Profile = () => {
  return (
    <>
      <AdminNavbar
        brandText={"Reports"}
      />
      <UserHeader />
      {/* Page content */}
      <Footer containerStyle={{ position: 'absolute' }} />
    </>
  )
}

export default Profile
