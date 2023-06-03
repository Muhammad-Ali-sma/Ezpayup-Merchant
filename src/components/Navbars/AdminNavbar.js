import { Link } from 'react-router-dom'
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAuth } from 'Redux/authSlice';

const AdminNavbar = (props) => {

  const user = useSelector(state => state.authUser.userData);
  const dispatch = useDispatch();
  const Logout = () => {
    document.getElementsByTagName('body')[0].classList.remove('dark-mode');
    dispatch(logoutAuth());
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <span
            className="h4 mb-0 text-white text-uppercase d-none d-md-inline-block"
          >
            {props.brandText}
          </span>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require('../../assets/img/theme/team-1-800x800.jpg')}
                    />
                  </span>
                  <Media className="ml-2 d-none d-md-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {user?.user_name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => Logout()} tag={Link} to="/login" >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AdminNavbar
