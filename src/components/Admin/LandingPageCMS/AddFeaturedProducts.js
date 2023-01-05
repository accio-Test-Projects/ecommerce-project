import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import "./LandingPageCMS.css";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../FirebaseConfig";
function AddFeaturedProducts({saveLandingPageInfo}) {
  const [featuredProducts, setFeaturedProducts] = React.useState([]);
  const [skuSearch, setSkuSearch] = useState("");
  const [productfromSearch, setProductfromSearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchForSKU = async (val) => {
    const q = query(collection(db, "products"), where("productSKU", "==", val));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
    });
    setProductfromSearch(data[0]);
  };
  useEffect(() => {
    if (skuSearch) {
      //call firebase and search products with this sku
      // render those product
      searchForSKU(skuSearch);
    }
  }, [skuSearch]);


  const fetchInfo = async () => {
    const docRef = await doc(db, "landingPage", "featured_products");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFeaturedProducts(Object.values(docSnap.data()))
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  return (
    loading?(
      <div>loading</div>
    ):(
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
        <h1>Add Featured Products</h1>
        <Button
          onClick={() => saveLandingPageInfo("featured_products", featuredProducts)}
        >
          Save
        </Button>
        </Grid>
    
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
        item
        xs={12}
      >
        {featuredProducts.map((product, index) => {
          return (
            <div key={product.product_id
            } className="featuredProduct">
              <div>
                <img width="100%" src={product.productImage} alt="product" />
              </div>
              <div>
              <div> name - {product.productName}</div>
              <div>price - {product.productPrice} rs</div>
              </div>
              <span>
                <CancelIcon
                  onClick={() => {
                    setFeaturedProducts(
                      featuredProducts.filter(
                        (item, i) => item.product_id !== product.product_id
                      )
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
        <TextField
          placeholder="SKU"
          value={skuSearch}
          onChange={(e) => setSkuSearch(e.target.value)}
          fullWidth
        />
        {productfromSearch && (
          <div
          onClick={()=>setFeaturedProducts(p=>{return [...p,productfromSearch]})}
          className="product-from-search">
            {productfromSearch?.productName}
          </div>
        )}
      </Grid>
    </Grid>)
  );
}

export default AddFeaturedProducts;
