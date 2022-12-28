import { Grid, TextField } from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./LandingPageCMS.css";
function AddFeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = React.useState([
    {
      productCategory: "men_clothing",
      productDescription: "ij",
      productImage: "https://rukminim1.flixcart.com/image/400/400/kmp7ngw0/monitor/j/z/h/s2721hn-27-py0df-dell-original-imagfjphuywuh2a7.jpeg?q=70",
      productInventory: 8994,
      productName: "TV",
      productPrice: 3232,
      productSKU: "oji",
      product_id: "b7206f2d-67bd-4ee4-a3d3-a3a92049cada",
    },
    {
      productCategory: "men_clothing",
      productDescription: "ij",
      productImage: "https://rukminim1.flixcart.com/image/400/400/kmp7ngw0/monitor/j/z/h/s2721hn-27-py0df-dell-original-imagfjphuywuh2a7.jpeg?q=70",
      productInventory: 8994,
      productName: "TV",
      productPrice: 3232,
      productSKU: "oji",
      product_id: "b7ss206f2d-67bd-4ee4-a3d3-a3a92049cada",
    },
  ]);
  return (
    <Grid className="container" container>
      <Grid item xs={12}>
        <h1>Add Featured Products</h1>
      </Grid>
      <Grid
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}
      item xs={12}>
        
        {featuredProducts.map((product, index) => {
          return (
            <div
            className="featuredProduct"
            >
              <div>
                <img width='100%' src={product.productImage} alt="product" />
              </div>
              <div>{product.productName}</div>
              <div>{product.productPrice} rs</div>
              <span>
                <CancelIcon
                onClick={() => {
                  setFeaturedProducts(
                    featuredProducts.filter((item, i) => item.product_id!== product.product_id)
                  );
                }}
                  sx={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
                </span>
            </div>
          );
        })}
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth />
        {/* 
      product
      */}
      </Grid>
    </Grid>
  );
}

export default AddFeaturedProducts;
