import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ title, options, onChange, value }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value ? value : ""}
          label="year"
          onChange={onChange}
        >
          { options.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>) }
        </Select>
      </FormControl>
    </Box>
  );
}