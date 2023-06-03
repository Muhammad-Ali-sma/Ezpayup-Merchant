/*eslint-disable*/
import { useState } from 'react'
import { NavLink as NavLinkRRD, Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Groups2Icon from '@mui/icons-material/Groups2';
import MessageIcon from '@mui/icons-material/Message';
import SummarizeIcon from '@mui/icons-material/Summarize';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// reactstrap components
import {
  Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Media, NavbarBrand,
  Navbar, NavItem, NavLink, Nav, Container, Row, Col
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDarkMode } from 'Redux/authSlice';
import { logoutAuth } from 'Redux/authSlice';

const Sidebar = () => {
  const [collapseOpen, setCollapseOpen] = useState();
  const user = useSelector(state => state.authUser.userData);
  const darkMode = useSelector(state => state.authUser.darkMode);
  const dispatch = useDispatch();

  const Logout = () => {
    document.getElementsByTagName('body')[0].classList.remove('dark-mode');
    dispatch(logoutAuth());
  }
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data)
  }
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false)
  }
  const setTheme = () => {
    if (!darkMode) {
      document.getElementsByTagName("body")[0].classList.add("dark-mode")
    } else {
      document.getElementsByTagName("body")[0].classList.remove("dark-mode");
    }
    dispatch(toggleDarkMode(!darkMode));
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <NavbarBrand className="pt-0" href={'/merchant-profile'}>
          <img
            alt={'logo'}
            className="navbar-brand-img"
            src={user.merchantLogoUrl ?? 'logo2.png'}
          />
        </NavbarBrand>
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require('../../assets/img/theme/team-1-800x800.jpg')}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => Logout()} tag={Link} to='/login'>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to={'/merchant-profile'}>
                  <img alt={'logo'} src={user.merchantLogoUrl ?? 'logo2.png'} />
                </Link>
              </Col>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>
            <NavItem>
              <NavLink
                to={'/merchant-profile'}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                activeClassName="active"
              >
                <AccountCircleIcon /> &nbsp;&nbsp;
                Merchant Profile
              </NavLink>
              <NavLink
                to={'/course-schedules'}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                activeClassName="active"
              >
                <EventNoteIcon /> &nbsp;&nbsp;
                Course Schedule
              </NavLink>
              <NavLink
                to={'/students'}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                activeClassName="active"
              >
                <Groups2Icon /> &nbsp;&nbsp;
                Manage Students
              </NavLink>
              <NavLink
                to={'/broadcast'}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                activeClassName="active"
              >
                <MessageIcon /> &nbsp;&nbsp;
                Broadcast Messages
              </NavLink>
              <NavLink
                to={'/report'}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                activeClassName="active"
              >
                <SummarizeIcon /> &nbsp;&nbsp;
                Reports
              </NavLink>
              <NavLink
                to={'#'}
                onClick={() => { setTheme(); closeCollapse(); }}
                style={{ cursor: 'pointer' }}
              >
                {darkMode ? <DarkModeOutlinedIcon /> : <WbSunnyOutlinedIcon />} &nbsp;&nbsp;
                {darkMode ? "Dark" : "Light"} Mode
              </NavLink>

            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default Sidebar
