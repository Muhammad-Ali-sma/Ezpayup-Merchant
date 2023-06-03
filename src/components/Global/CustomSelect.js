import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const CustomSelect = ({ label, handleChange, data, name, className, placeholder, defaultVal = '' }) => {
    const [val, setVal] = React.useState(defaultVal);

    React.useEffect(() => {
        if (defaultVal) {
            setVal(defaultVal);
        }
    }, [defaultVal])

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" >{label}</InputLabel>
                <Select
                    value={val}
                    label={label}
                    onChange={(e) => { setVal(e.target.value); handleChange(e) }}
                    className={className}
                    name={name}
                >
                    {data.map(x => x?.course_id ? <MenuItem key={`item_${x?.course_id}`} value={x.course_id}>{x.course_name}</MenuItem> : <MenuItem key={`item_${x?.location_id}`} value={x.location_id}>{x.location_name}</MenuItem>)}
                </Select>
            </FormControl>

        </div>
    )
}

export default CustomSelect