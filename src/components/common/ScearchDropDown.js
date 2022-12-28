import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ScearchDropDown({ dropDownOptions, label, onChange }) {
  return (
    <div>
      <label className="inp-label" htmlFor="label">
        {label}
      </label>

      <Autocomplete
        onChange={(event, newValue) => {
          onChange(newValue.value,newValue.label);
        }}
        disablePortal
        id="combo-box-demo"
        options={dropDownOptions}
       
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
}

export default ScearchDropDown;
