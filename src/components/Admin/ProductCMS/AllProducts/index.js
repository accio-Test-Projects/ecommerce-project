/* eslint-disable no-console */
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import AllProductsView from "./AllProductsView";
import { useDispatch, useSelector } from "react-redux";
import ImageInputField from "../../../common/ImageInputField";
import ScearchDropDown from "../../../common/ScearchDropDown";
import {
  ProductCategories,
  locationDropDownOptions,
} from "../../../../constants";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import "../Products.css";
// import { db } from "../../../../FirebaseConfig";
import { AddProduct,getAllProducts,deleteProduct } from "../../../../store/Dispatchs";

const initialValues = {
  productName: "",
  productDescription: "",
  productPrice: "",
  productImage: "",
  productSKU: "",
  productCategory: "",
  shipingLocation: [],
  shipingPrice: "",
  productInventory: "",
};
function CareerSection({ saveData }) {
  const [editBtn, setEditBtn] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch();
  const [AllProducts, setAllProducts] = useState(null);

  useEffect(() => {
    //call a function to get all products
   getAllProducts().then((data)=>{
      setAllProducts(data);
   });
  }, []);


  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // saveData('ADD_CAREER', values);
      AddProduct({ values, resetForm: () => formik.resetForm(), setEditBtn });
    },
  });

  const handleEdit = (data) => {
    Object.keys(data).forEach((key) => {
      formik.setFieldValue(key, data[key]);
    });

    setEditBtn(!editBtn);
  };
  const handleDelete = (data) => {
   deleteProduct(data)
  };
  const handleAddnew = () => {
    formik.setFieldValue({ ...initialValues });
    setEditBtn(!editBtn);
  };

  const handleAddnewLocation = (val) => {
    let oldLocation = formik.values.shipingLocation;
    if (!oldLocation.includes(val)) {
      oldLocation.push(val);
    }
    formik.setFieldValue("shipingLocation", oldLocation);
  };

  return (
    <form style={{ margin: "20px 0px" }} onSubmit={formik.handleSubmit}>
      <Grid
        sx={{
          position: "sticky",
          top: "60px",
          background: "white",
          padding: "10px",
          zIndex: "2",
          display: "flex",
          justifyContent: "flex-end",
        }}
        item
        xs={12}
      >
        {" "}
        {editBtn ? (
          <Button
            type="submit"
            sx={{
              background: "#f50057",
              color: "#fff",
              borderRadius: "10px",
              minWidth: "100px",
              height: "40px",
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={handleAddnew}
            type="button"
            sx={{
              background: "#f50057",
              color: "#fff",
              borderRadius: "10px",
              minWidth: "100px",
              height: "40px",
            }}
          >
            Add New
          </Button>
        )}
      </Grid>
      {editBtn ? (
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <label className="inp-label" htmlFor="productName">
              Product Name
            </label>
            <TextField
              size="small"
              sx={{
                marginTop: "10px",
                "& div": {
                  borderRadius: "10px",
                },
              }}
              fullWidth
              id="productName"
              name="productName"
              required
              variant="outlined"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <label className="inp-label" htmlFor="productDescription">
              Product Discription
            </label>
            <TextField
              multiline
              rows={4}
              size="small"
              sx={{
                marginTop: "10px",
                "& div": {
                  borderRadius: "10px",
                },
              }}
              fullWidth
              id="productDescription"
              name="productDescription"
              required
              variant="outlined"
              value={formik.values.productDescription}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <label className="inp-label" htmlFor="productPrice">
              Product Price
            </label>
            <TextField
              type={"number"}
              size="small"
              sx={{
                marginTop: "10px",
                "& div": {
                  borderRadius: "10px",
                },
              }}
              fullWidth
              id="productPrice"
              name="productPrice"
              required
              variant="outlined"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageInputField
              label={"Product Image"}
              value={formik.values.productImage}
              required={false}
              formik={formik}
              key={"productImage"}
            />
          </Grid>
          <Grid item xs={6}>
            <label className="inp-label" htmlFor="productSKU">
              SKU
            </label>
            <TextField
              size="small"
              sx={{
                marginTop: "10px",
                "& div": {
                  borderRadius: "10px",
                },
              }}
              fullWidth
              id="productSKU"
              name="productSKU"
              required
              variant="outlined"
              value={formik.values.productSKU}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <label className="inp-label" htmlFor="productCategory">
              Product Category
            </label>
            <div>
              <Select
                required
                size="small"
                sx={{
                  marginTop: "10px",
                  "& div": {
                    borderRadius: "10px",
                  },
                }}
                labelId="demo-simple-select-autowidth-label"
                id="productCategory"
                name="productCategory"
                value={formik.values.productCategory}
                onChange={formik.handleChange}
                fullWidth
              >
                {ProductCategories.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </Grid>
          <Grid item xs={6}>
            <label className="inp-label" htmlFor="shipingPrice">
              Shiping Price
            </label>
            <TextField
              size="small"
              sx={{
                marginTop: "10px",
                "& div": {
                  borderRadius: "10px",
                },
              }}
              fullWidth
              id="shipingPrice"
              name="shipingPrice"
              required
              variant="outlined"
              value={formik.values.shipingPrice}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <label className="inp-label" htmlFor="productInventory">
              Product Inventory
            </label>
            <TextField
              size="small"
              type={"number"}
              sx={{
                marginTop: "10px",
                "& div": {
                  borderRadius: "10px",
                },
              }}
              fullWidth
              id="productInventory"
              name="productInventory"
              required
              variant="outlined"
              value={formik.values.productInventory}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <div className="shippingLocation">
              <ScearchDropDown
                onChange={(newValue) => {
                  handleAddnewLocation(newValue);
                }}
                dropDownOptions={locationDropDownOptions}
                label={"Shiping Locations"}
              />
              {formik.values.shipingLocation.map((item, i) => {
                return <div>{item}</div>;
              })}
            </div>
          </Grid>
        </Grid>
      ) : AllProducts && AllProducts.length === 0 ? (
        <div>no data</div>
      ) : AllProducts && AllProducts.length > 0 ? (
        <AllProductsView
          pageNo={pageNo}
          setPageNo={setPageNo}
          pageSize={pageSize}
          setPageSize={setPageSize}
          data={AllProducts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <div>loading</div>
      )}
    </form>
  );
}

export default React.memo(CareerSection);
