import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../FirebaseConfig";

function CategoryPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { category } = params;
  console.log(params);

  const fetchData = async (category) => {
    const q = await query(
      collection(db, "products"),
      where("productCategory", "==", category)
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

    fetchData(category);
  }, [params]);
  return loading ? <div>loading</div> : <div>CategoryPage {category}</div>;
}

export default CategoryPage;
