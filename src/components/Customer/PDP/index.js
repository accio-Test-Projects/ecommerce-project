import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from "../../../FirebaseConfig";

function PDP() {
  const params=useParams();
  const {id}=params
  const [loading, setLoading] = useState(true);
  const fetchData = async (productId) => {
    const q = await query(
      collection(db, "products"),
      where("product_id", "==", productId)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    setLoading(false);
  };
  useEffect(() => {
    //call firestore in product collect get all products were productCategory==category

    fetchData(id);
  }, [params]);
  console.log(id)
  return (
    loading?(
      <div>loading</div>
    ): (<div>PDP {id}</div>
  ))
}

export default PDP