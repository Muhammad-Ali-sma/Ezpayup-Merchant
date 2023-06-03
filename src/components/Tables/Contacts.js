import React from 'react'
import { Card, Media, Row, Table } from 'reactstrap'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContactModal from 'components/Modals/ContactModal'
import Confirmation from 'components/Dialogs/Confirmation'

const Contacts = ({ contacts, getMerchantContacts }) => {
    const [selectedContact, setSelectedContact] = React.useState(null);
    const [showModal, setShowModal] = React.useState('');
console.log(contacts)
    return (
        <>
            <Row>
                <div className="col">
                    <Card className="shadow table-card">
                        <Table className="align-items-center table-flush" responsive>
                            <thead className="table-header-theme">
                                <tr>
                                    <th scope="col">
                                        <b>Name</b>
                                    </th>
                                    <th scope="col">
                                        <b>Address</b>
                                    </th>
                                    <th scope="col">
                                        <b>Contact Numbers</b>
                                    </th>
                                    <th scope="col">
                                        <b>Contact Emails</b>
                                    </th>
                                    <th scope="col">
                                        <b>Actions</b>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts?.map((contact, index) => (
                                    <React.Fragment key={`contact_${index}`}>
                                        <tr>
                                            <th scope="row">
                                                <Media className="align-items-center">
                                                    <Media>
                                                        <span className="mb-0 text-sm">
                                                            {contact.first_name} {contact.middle_name} {contact.last_name}
                                                        </span>
                                                    </Media>
                                                </Media>
                                            </th>
                                            <td>
                                                {contact.address1}
                                                
                                                {contact.address2 && <br />}
                                                {contact.address2}
                                                <br />
                                                {contact.city} {contact.state} {contact.country}  {contact.zip}
                                            </td>
                                            <td>
                                                {contact.home_phone_no} <br />
                                                {contact.mobile_phone_no} <br />
                                                {contact.work_phone_no}
                                            </td>
                                            <td>
                                                {contact.personal_email_address} <br />
                                                {contact.work_email_address}
                                            </td>
                                            <td>
                                                <EditIcon
                                                    onClick={() => { setSelectedContact(contact); setShowModal('edit') }}
                                                /> &nbsp;
                                                {contact?.is_primary !== 'Y' &&
                                                    <DeleteIcon
                                                        onClick={() => { setSelectedContact(contact); setShowModal('delete'); }}
                                                    />
                                                }
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </Row>
            <Confirmation
                isDialogOpen={showModal === 'delete' ? true : false}
                toggleDialog={() => deleteLocation()}
                handleClose={() => setShowModal('')}
            />
            <ContactModal
                isModalOpen={showModal === 'edit' ? true : false}
                handleClose={() => { getMerchantContacts(); setShowModal('') }}
                data={selectedContact}
            />
        </>
    )
}

export default Contacts