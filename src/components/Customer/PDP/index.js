import { Button } from '@mui/material';
import { addDoc, collection,  getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from "../../../FirebaseConfig";
import {useContext} from 'react';
import {userContext} from '../../../Context/userContext';
function PDP() {
  const params=useParams();
  const [state, dispatch] = useContext(userContext);
  const {id}=params
  const navigate=useNavigate();
  const [loading, setLoading] = useState(true);
  const [productInfo, setProductInfo] = useState(null)
  const fetchData = async (productId) => {
    const q = await query(
      collection(db, "products"),
      where("product_id", "==", productId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setProductInfo(doc.data())
    });
    setLoading(false);
  };
  useEffect(() => {
    //call firestore in product collect get all products were productCategory==category

    fetchData(id);
  }, [params]);
  console.log(id)

  const Buynow=async()=>{
    console.log("buy now")
    // add to cart in firestore
    //redirect to /cart
if(state.isAuth){
  console.log("user is auth")
  await addDoc(collection(db, "cart"), {
    product_id: productInfo.product_id,
    productName: productInfo.productName,
    productPrice: productInfo.productPrice,
    productImage: productInfo.productImage,
    productCategory: productInfo.productCategory,
    userId:state.user.uid
  });
  alert("product added to cart")
  navigate("/cart")
}
else{
  console.log("please login")
}


  }
  return (
    loading?(
      <div>loading</div>
    ): (<div>PDP {id}
    <div>
      {
        productInfo.productName
      }
      </div>
      <Button
      onClick={Buynow}
      >Buy now</Button>
      </div>
  ))
}

export default PDP