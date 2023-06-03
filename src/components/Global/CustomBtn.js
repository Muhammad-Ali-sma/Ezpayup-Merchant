import { CircularProgress } from '@mui/material'
import React from 'react'
import { Button } from 'reactstrap'

const CustomBtn = ({ color = "primary", onClick = () => { }, type = 'button', loading = false, title = 'Update', disabled = false,btnStyle }) => {
    return (
        <>
            {loading ? <CircularProgress /> :
                <Button disabled={disabled} style={btnStyle} color={color} onClick={onClick} type={type}>
                    {title}
                </Button>
            }
        </>
    )
}

export default CustomBtn