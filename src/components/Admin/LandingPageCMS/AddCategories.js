import { Grid } from "@mui/material";
import React from "react";
import ScearchDropDown from "../../common/ScearchDropDown";
import { ProductCategories } from "../../../constants";
import CancelIcon from '@mui/icons-material/Cancel';

import './LandingPageCMS.css'

function AddCategories() {
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  return (
    <Grid className="container" container>
       <Grid item xs={12}>
        <h1>
          Add Categories
        </h1>
        </Grid>
      <Grid item xs={12}>
        <div
        className="cat-dropodown"
        >
        {selectedCategories.length>0?selectedCategories.map((item, index) => {
          return (
            <div key={index}>
             {item.label}
             <span>
              <CancelIcon
              sx={{
                fontSize:'15px'
              }}
                onClick={() => {
                  setSelectedCategories(
                    selectedCategories.filter((item, i) => i !== index)
                  );
                }}/>
             </span>
            </div>
          );
        }):<h3>please select a category</h3>}
        </div>
      </Grid>
      <Grid item xs={6}>
        <ScearchDropDown
          dropDownOptions={ProductCategories}
          label={""}
          onChange={(value, label) => {
            setSelectedCategories([...selectedCategories, { value, label }]);
          }}
        />
      </Grid>
    </Grid>
  );
}

export default AddCategories;
