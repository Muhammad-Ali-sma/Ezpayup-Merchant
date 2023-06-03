// reactstrap components
import { Card, Row, Table } from 'reactstrap'
// core components
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CourseModal from 'components/Modals/CourseModal'
import Confirmation from 'components/Dialogs/Confirmation'
import MerchantService from 'Services/MerchantService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Tables = ({ getMerchantCourses }) => {
  const courses = useSelector(state => state.authUser.courses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState('');

  const deleteCourse = () => {
    MerchantService.deleteMerchantCourse(selectedCourse?.course_id)
      .then(res => {
        console.log(res);
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
          getMerchantCourses();
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
        setShowModal('');
      })
      .catch(err => toast('Error occured please try again!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        type: 'error'
      }))
  }

  return (
    <>
      <Row>
        <div className="col">
          <Card className="shadow table-card">
            <Table className="align-items-center table-flush" responsive>
              <thead className="table-header-theme">
                <tr>
                  <th scope="col">
                    <b>Course Name</b>
                  </th>
                  <th scope="col">
                    <b>Course Description</b>
                  </th>
                  <th scope="col">
                    <b>Course Locations</b>
                  </th>
                  <th scope="col">
                    <b>Actions</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => {
                  return (
                    <React.Fragment key={`course_${index}`}>
                      <tr>
                        <th scope="row" style={{ backgroundColor: course.course_calendar_color_hex ? `#${course.course_calendar_color_hex}` : 'white', color: 'white' }}>
                          <span className="mb-0 text-sm">
                            {course.course_name}
                          </span>
                        </th>
                        <td style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{course.course_description}</td>
                        <td style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>{course.locations?.map((x,i) => <li key={`location_${i}`}>{x}</li>)}</td>
                        <td>
                          <EditIcon
                            onClick={() => { setSelectedCourse(course); setShowModal('edit') }}
                          /> &nbsp;
                          <DeleteIcon
                            onClick={() => { setSelectedCourse(course); setShowModal('delete'); }}
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>
            </Table>
          </Card>
        </div>
      </Row>
      <Confirmation
        isDialogOpen={showModal === 'delete' ? true : false}
        toggleDialog={() => {
          deleteCourse()
        }}
        handleClose={() => setShowModal('')}
      />
      <CourseModal
        isModalOpen={showModal === 'edit' ? true : false}
        data={selectedCourse}
        toggleModal={() => { getMerchantCourses(); setShowModal('') }}
      />
    </>
  )
}

export default Tables
