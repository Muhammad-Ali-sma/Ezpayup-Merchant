import { Card, Media, Table, Row } from 'reactstrap'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LocationModal from 'components/Modals/LocationModal'
import Confirmation from 'components/Dialogs/Confirmation'
import MerchantService from 'Services/MerchantService'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Tables = ({ getMerchantLocation }) => {
  const [modal, setModal] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null)
  const merchantLocations = useSelector(state => state.authUser.courseLocations);


  const deleteLocation = () => {
    MerchantService.deleteMerchantLocation(selectedLocation?.location_id)
      .then(res => {
        console.log(res);
        if (res.status === 'success') {
          getMerchantLocation();
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
        setModal('');
        setSelectedLocation(null);
      })
      .catch(err => toast("Error occured please try again!", {
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
      <Card className="shadow table-card">
        <Table className="align-items-center table-flush" responsive>
          <thead className="table-header-theme">
            <tr>
              <th scope="col">
                <b>Location Name</b>
              </th>
              <th scope="col">
                <b>Address</b>
              </th>
              <th scope="col">
                <b>Contact Details</b>
              </th>
              <th scope="col">
                <b>Actions</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {merchantLocations?.map((location, index) => (
              <React.Fragment key={`location_${index}`}>
                <tr>
                  <th scope="row">
                    <Media className="align-items-center">
                      <Media>
                        <span className="mb-0 text-sm">
                          {location.location_name}
                        </span>
                      </Media>
                    </Media>
                  </th>
                  <td>
                    {location.address1}
                    {location.address2 && <br />}
                    {location.address2}
                    <br />
                    {location.city} {location.state} {location.zip}
                  </td>
                  <td>
                    {location.city}
                    <br />
                    {location.state}
                    <br />
                    {location.country} - {location.zip}
                  </td>
                  <td>
                    <EditIcon onClick={() => { setModal('edit'); setSelectedLocation(location) }} /> &nbsp;
                    {location.is_main_location !== 'Y' &&
                      <DeleteIcon
                        onClick={() => {
                          setSelectedLocation(location)
                          setModal('delete')
                        }}
                      />
                    }
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Card>

      <Confirmation
        isDialogOpen={modal === 'delete' ? true : false}
        toggleDialog={() => deleteLocation()}
        handleClose={() => setModal('')}
      />
      <LocationModal
        data={selectedLocation}
        isModalOpen={modal === 'edit' ? true : false}
        handleClose={() => { getMerchantLocation(); setModal('') }}
      />
    </>
  )
}

export default Tables
