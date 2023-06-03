import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const Confirmation = (props) => {
  const { isDialogOpen, toggleDialog, handleClose } = props

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Are you sure to Perform this Action?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={toggleDialog}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Confirmation
