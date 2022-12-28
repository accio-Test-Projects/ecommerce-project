import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import ImageInputField from "../../common/ImageInputField";
import CancelIcon from '@mui/icons-material/Cancel';

import "./LandingPageCMS.css";
function AddBanner() {
  const [Banners, setBanners] = React.useState([1,2]);

  const addBanner = () => {
    setBanners([...Banners, 1]);
  }
  return (
    <Grid className="container" >
      <Grid item xs={12}>
        <h1>
          Add Banners
        </h1>
        </Grid>
    {
      Banners.map((item, index) => {
        return(
          <Grid 
          className="banner-container"
          container spacing={2}>
          <Grid item xs={12}>
            <ImageInputField />
          </Grid>
          <Grid item xs={6}>
            <TextField required fullWidth placeholder="Enter Banner Title" />
          </Grid>
          <Grid item xs={6}>
            <TextField required fullWidth placeholder="Enter Banner Subtitle" />
          </Grid>
          <span 
          style={{
            color: 'red',
            position: 'absolute',
          }}
          >
              <CancelIcon
              sx={{
                fontSize:'20px'
              }}
                onClick={() =>{
                  setBanners(Banners.filter((item, i) => i !== index))
                }}/>
             </span>
        </Grid>
        )
      })
    }
      <Grid item xs={12}>
        <Button
        onClick={addBanner}
        >Add Banner</Button>
      </Grid>
    </Grid>
  );
}

export default AddBanner;
