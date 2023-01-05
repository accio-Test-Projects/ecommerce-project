import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageInputField from "../../common/ImageInputField";
import CancelIcon from "@mui/icons-material/Cancel";
import { db } from "../../../FirebaseConfig";
import "./LandingPageCMS.css";
import { doc, getDoc } from "firebase/firestore";
function AddBanner({ saveLandingPageInfo }) {
  const [Banners, setBanners] = React.useState([]);
  const [loading, setLoading] = useState([]);
  const addBanner = () => {
    setBanners([...Banners, { url: "", heading: "", subheading: "" }]);
  };

  const onInputchange = (variable, value, index) => {
    let banner = [...Banners];
    banner[index][variable] = value;
    setBanners(banner);
  };
  const fetchInfo = async () => {
    const docRef = await doc(db, "landingPage", "banners");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBanners(Object.values(docSnap.data()));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  return loading ? (
    <div>loading</div>
  ) : (
    <Grid className="container">
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        item
        xs={12}
      >
        <h1>Add Banner</h1>
        <Button onClick={() => saveLandingPageInfo("banners", Banners)}>
          Save
        </Button>
      </Grid>
      {Banners.map((item, index) => {
        return (
          <Grid className="banner-container" container spacing={2}>
            <Grid item xs={12}>
              <ImageInputField
              value={item.url}
              onSave={(url)=> onInputchange("url", url, index)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={item.heading}
                onChange={(e) =>
                  onInputchange("heading", e.target.value, index)
                }
                required
                fullWidth
                placeholder="Enter Banner Title"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={item.subheading}
                onChange={(e) =>
                  onInputchange("subheading", e.target.value, index)
                }
                required
                fullWidth
                placeholder="Enter Banner Subtitle"
              />
            </Grid>
            <span
              style={{
                color: "red",
                position: "absolute",
              }}
            >
              <CancelIcon
                sx={{
                  fontSize: "20px",
                }}
                onClick={() => {
                  setBanners(Banners.filter((item, i) => i !== index));
                }}
              />
            </span>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Button onClick={addBanner}>Add Banner</Button>
      </Grid>
    </Grid>
  );
}

export default AddBanner;
