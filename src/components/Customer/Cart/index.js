import { Button, TextField } from "@mui/material";
import { collection, getDocs, query, addDoc, where,deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../Context/userContext";
import { db } from "../../../FirebaseConfig";

function Cart() {
  const [state, dispatch] = useContext(userContext);
  const [address, setAddress] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    //get cart data from firestore
    //display it
    const q = await query(
      collection(db, "cart"),
      where("userId", "==", state.user.uid)
    );
    const querySnapshot = await getDocs(q);
    let tempProducts = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tempProducts.push(doc.data());
    });
    setProducts(tempProducts);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const checkout = async() => {
    // check
    if(address===""||PhoneNo===""){
      alert("please fill address and phone no")
      return;
    }
    else{
      //add order to firestore
      //delete cart
      //redirect to home
      const data={
        userId: state.user.uid,
        userName: state.user.displayName,
        userEmail: state.user.email,
        address: address,
        PhoneNo: PhoneNo,
        products: products,
      }
      console.log(data)
      try{
      await addDoc(collection(db, "orders"), {
      ...data
      })
      // delete cart
      const q = await query(
        collection(db, "cart"),
        where("userId", "==", state.user.uid)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        deleteDoc(doc.ref)
      })
      alert("order placed")
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
    }
  };
  return (
    <div>
      {products && products.length === 0 ? (
        <div>no data</div>
      ) : products && products.length > 0 ? (
        <div>
          {products.map((product) => {
            return (
              <div>
                <img width="100px" src={product.productImage} alt="" />
                <h1>{product.productName}</h1>
                <h1>{product.productPrice}</h1>
              </div>
            );
          })}
          <TextField
            multiline
            minRows={5}
            fullWidth
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            placeholder="PhoneNo"
            value={PhoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <Button onClick={checkout}>Checkout</Button>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}

export default Cart;
