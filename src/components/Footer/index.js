import { DialogContent, DialogContentText, Link } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { Row } from 'reactstrap'
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const Footer = ({ containerStyle }) => {
    const [open, setOpen] = React.useState(false);


    return (
        <>
            <div className='custom-footer' style={containerStyle}>
                <Row className='justify-content-center'>
                    <p style={{ whiteSpace: 'break-spaces' }}>{moment().format('YYYY')} EZ Pay Up, LLC. All Rights Reserved. | <Link onClick={() => setOpen('privacy')} style={{ cursor: 'pointer' }} underline='none'>Privacy Policy</Link> | <Link style={{ cursor: 'pointer' }} onClick={() => setOpen('terms')} underline='none'>Terms & Conditions</Link></p>
                </Row>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth='md'
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => setOpen(false)}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {open === 'privacy' ? "Privacy Policy" : 'Terms & Conditions'}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogContent>
                        <DialogContentText>
                            {open === 'privacy' &&
                                <div className="privacy-policy">
                                    <h3>Privacy Policy for EZ Pay Up</h3>
                                    <p>At EZ Pay Up, we take the protection of your personal information seriously. This privacy policy outlines what information we collect, how we use it, and how we protect it.</p>
                                    <h3>Information We Collect</h3>
                                    <p>EZ Pay Up collects information from you when you make a payment through our platform. This information may include your name, address, email address, phone number, payment method information, and the amount and nature of your purchase.<br /><br />
                                        <b>How We Use Your Information</b><br />
                                        We use your information to process your payment and to provide customer support. We may also use your information for internal purposes, such as auditing, data analysis, and research, to improve our services.<br /><br />
                                        <b>Sharing of Your Information</b><br />
                                        EZ Pay Up does not sell or rent your personal information to third parties. We may share your information with third-party service providers who assist us in providing our services, such as payment processors. These third parties are required to maintain the confidentiality of your information and to use it only to provide the services we have engaged them to provide.<br /><br />
                                        <b>Security of Your Information</b><br />
                                        EZ Pay Up takes appropriate measures to protect the security of your personal information, including using industry-standard encryption technologies. However, no method of transmission or storage is 100% secure, and we cannot guarantee the security of your information.<br /><br />
                                        <b>Your Choices</b><br />
                                        You may update or correct your personal information at any time by contacting us. You may also choose to opt out of receiving marketing communications from us by following the unsubscribe instructions in the communication.<br /><br />
                                        <b>Changes to This Privacy Policy</b><br />
                                        EZ Pay Up may make changes to this privacy policy from time to time. If we make changes, we will post the updated policy on our website and update the effective date accordingly.<br /><br />
                                        This privacy policy was last updated on 03 February, 2023.<br /><br />
                                        If you have any questions about our privacy policy, please contact us.
                                    </p>
                                </div>
                            }
                            {open === 'terms' &&
                                <div className="privacy-policy">
                                    <h3>EZ Pay Up Terms and Conditions</h3>
                                    <p>Welcome to EZ Pay Up, an online payment platform that allows customers to pay for goods and services from their preferred merchants. By using EZ Pay Up, you agree to the following terms and conditions:</p>
                                    <h3>Payment Processing</h3>
                                    <p>EZ Pay Up processes payments on behalf of merchants. When you make a payment through EZ Pay Up, you are entering into a transaction with the merchant and not with EZ Pay Up.<br /><br />
                                        <b>Payment Authorization</b><br />
                                        By making a payment through EZ Pay Up, you are authorizing EZ Pay Up to charge your payment method for the amount due. You agree to provide accurate and complete information for your payment method, and to promptly update any changes to this information.<br /><br />
                                        <b>Refunds and Returns</b><br />
                                        EZ Pay Up does not issue refunds. Refunds and returns are the responsibility of the merchant. If you have a dispute or issue with a purchase, please contact the merchant directly.<br /><br />
                                        <b>Fees</b><br />
                                        EZ Pay Up may charge fees for the use of its services. These fees will be disclosed to you prior to your making a payment and will be included in the total amount due.<br /><br />
                                        <b>Security</b><br />
                                        EZ Pay Up takes the security of your payment information very seriously. We use industry-standard encryption technologies to protect your information and prevent unauthorized access. However, no method of transmission or storage is 100% secure, and we cannot guarantee the security of your information.<br /><br />
                                        <b>Privacy</b><br />
                                        EZ Pay Up respects your privacy. We do not sell or share your personal information with third parties, except as necessary to provide our services or as required by law. Our privacy policy, which is available on our website, explains how we use and protect your information.<br /><br />
                                        <b>Disputes</b><br />
                                        In the event of a dispute between you and a merchant, EZ Pay Up will make reasonable efforts to assist in resolving the dispute. However, we are not responsible for resolving disputes and make no representation or warranty as to the outcome of any dispute.<br /><br />
                                        <b>Limitation of Liability</b><br />
                                        EZ Pay Up is not liable for any damages arising from your use of its services, including but not limited to damages resulting from the failure of the service, unauthorized access to your information, or errors or omissions in the information provided by the merchant.<br /><br />
                                        <b>Changes to Terms and Conditions</b><br />
                                        EZ Pay Up may make changes to these terms and conditions from time to time. If we make changes, we will post the updated terms on our website and update the effective date accordingly.<br /><br />
                                        By using EZ Pay Up, you agree to these terms and conditions. If you do not agree, please do not use our services.<br /><br />
                                        This Terms and Conditions was last updated on 03 February, 2023.
                                    </p>
                                </div>
                            }
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div >
        </>
    )
}

export default Footer