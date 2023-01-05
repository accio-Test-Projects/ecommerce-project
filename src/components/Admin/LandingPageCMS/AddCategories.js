import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScearchDropDown from "../../common/ScearchDropDown";
import { ProductCategories } from "../../../constants";
import CancelIcon from "@mui/icons-material/Cancel";
import { db } from "../../../FirebaseConfig";
import "./LandingPageCMS.css";
import { doc, getDoc } from "firebase/firestore";

function AddCategories({ saveLandingPageInfo }) {
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const fetchInfo = async () => {
    const docRef = await doc(db, "landingPage", "categories");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setSelectedCategories(Object.values(docSnap.data()))
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
    <Grid className="container" container>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        item
        xs={12}
      >
        <h1>Add Categories</h1>
        <Button
          onClick={() => saveLandingPageInfo("categories", selectedCategories)}
        >
          Save
        </Button>
      </Grid>
      <Grid item xs={12}>
        <div className="cat-dropodown">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((item, index) => {
              return (
                <div key={index}>
                  {item.label}
                  <span>
                    <CancelIcon
                      sx={{
                        fontSize: "15px",
                      }}
                      onClick={() => {
                        setSelectedCategories(
                          selectedCategories.filter((item, i) => i !== index)
                        );
                      }}
                    />
                  </span>
                </div>
              );
            })
          ) : (
            <h3>please select a category</h3>
          )}
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
