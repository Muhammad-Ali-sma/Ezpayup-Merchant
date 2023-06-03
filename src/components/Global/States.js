import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { US_STATES } from 'utils/constants'

const States = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel>State *</InputLabel>
            <Select
                fullWidth={true}
                label="State *"
                required
                variant="outlined"
                value={value}
                onChange={onChange}
            >
                {US_STATES.map((item) => <MenuItem key={`state_${item.value}`} value={item.value}>{item.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default States