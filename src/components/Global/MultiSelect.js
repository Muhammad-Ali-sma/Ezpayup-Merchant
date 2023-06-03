import { Autocomplete, TextField } from '@mui/material'
import React from 'react'

const MultiSelect = ({ label, data, name, value, setValue, placeholder }) => {
    return (
        <>
            <Autocomplete
                multiple
                options={data}
                getOptionLabel={(option) => option.location_name}
                value={value}
                onChange={(e, val) => {
                    let item = {
                        target: {
                            value: val,
                            name
                        },
                    }
                    setValue(item)
                }}
                required
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}                        
                    />
                )
                }
            />
        </>
    )
}

export default MultiSelect