import { Badge, Card, CardHeader, CardFooter, Media, Pagination, PaginationItem, PaginationLink, Table, Row } from 'reactstrap'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import Confirmation from 'components/Dialogs/Confirmation'
import NestedMenuItem from 'material-ui-nested-menu-item'
import UserHeader from 'components/Headers/UserHeader.js'
import FormControl from '@mui/material/FormControl'
import { Menu, MenuItem, } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel'
import PrintIcon from '@mui/icons-material/Print'
import Select from '@mui/material/Select'
import React, { useState } from 'react'
import 'assets/css/styles.css'
import AdminNavbar from 'components/Navbars/AdminNavbar'
import { Container, Col, InputAdornment, TablePagination, TextField, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Layout from 'components/Global/Layout'
import Footer from 'components/Footer'
const Tables = () => {
  const [menuPosition, setMenuPosition] = useState(null)
  const [itemsCount, setIemsCount] = useState(10)
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleRightClick = (event) => {
    if (menuPosition) {
      return
    }
    event.preventDefault()
    setMenuPosition({
      top: event.screenY - 130,
      left: event.screenX - 60,
    })
  }

  const [isDialogOpen, setDialog] = useState(false)
  const toggleDialog = () => setDialog(!isDialogOpen)
  const handleItemClick = (event) => {
    setMenuPosition(null)
  }

  const getStudents = () => {

  }

  return (
    <>
      <AdminNavbar
        brandText={"Manage Students"}
      />
      <UserHeader />
      <Layout>
        <CardHeader className="border-0">
          <Grid container spacing={2} mt={1} mb={2}>
            <Grid item md={2} xs={6}>
              <h3 className="mb-0 ml-2">Students</h3>
            </Grid>
            <Grid item md={8} sx={{ display: { md: 'block', xs: 'none' } }}>
              <TextField
                className='custom-search'
                sx={{ float: 'right' }}
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={6}>
              <span className='mr-2 float-right'>
                <PrintIcon />
                &nbsp;&nbsp;&nbsp;
                <CloudDownloadIcon />
              </span>
            </Grid>
            <Grid item xs={12} sx={{ display: { md: 'none', sm: 'block' }, marginX: 1 }}>
              <TextField
                fullWidth={true}
                className='custom-search'
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {/* <Row className='mt-2 mb-2 align-items-center'> */}
          {/* <Col lg="2">
                    <h3 className="mb-0 ml-1">Students</h3>
                  </Col>
                  <Col lg="9" md={'12'}>
                    <TextField
                      className='custom-search'
                      sx={{ float: 'right' }}
                      placeholder="Search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </Col>
                  <Col lg="1" sx={{}}>
                    <PrintIcon />
                    &nbsp;&nbsp;&nbsp;
                    <CloudDownloadIcon />
                  </Col> */}
          {/* </Row> */}
        </CardHeader>
        <Table className="align-items-center table-flush" responsive>
          <thead className="table-header-theme">
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Parent Name</th>
              <th scope="col">Course Enrolled</th>
              <th scope="col">Monthly Fee</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
              (item, index) => {
                return (
                  <React.Fragment key={`student_${index}`}>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              Jessica Jones
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>John David</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          Level 1
                        </Badge>
                      </td>

                      <td>$2,500 USD</td>
                      <td>234-234-1234</td>
                      <td>
                        <i
                          className="fas fa-ellipsis-v"
                          onClick={handleRightClick}
                        />
                        {/* <Typography>Right click to open menu</Typography> */}
                        <Menu
                          open={!!menuPosition}
                          onClose={() => setMenuPosition(null)}
                          anchorReference="anchorPosition"
                          anchorPosition={menuPosition}
                        >
                          <MenuItem
                            onClick={(handleItemClick, toggleDialog)}
                          >
                            UnEnroll
                          </MenuItem>
                          <MenuItem onClick={toggleDialog}>
                            Delete
                          </MenuItem>
                          <NestedMenuItem
                            label="Beginner"
                            parentMenuOpen={!!menuPosition}
                            onClick={handleItemClick}
                          >
                            <MenuItem onClick={handleItemClick}>
                              Advanced
                            </MenuItem>
                            <MenuItem onClick={handleItemClick}>
                              Advanced 2
                            </MenuItem>
                          </NestedMenuItem>
                        </Menu>
                      </td>
                    </tr>
                    <tr></tr>
                  </React.Fragment>
                )
              },
            )}
          </tbody>
        </Table>
        <CardFooter className="custom-card-footer">
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardFooter>
      </Layout>
      <Confirmation isDialogOpen={isDialogOpen} toggleDialog={toggleDialog} />
      <Footer />
    </>
  )
}

export default Tables
