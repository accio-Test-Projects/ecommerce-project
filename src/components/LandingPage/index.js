import { collection, getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../../FirebaseConfig";

function LandingPage() {
  const fetchData = async () => {
    const data = await collection(db, "landingPage");
    const docRef = await getDocs(data);
    docRef.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>LandingPage</div>;
}

export default LandingPage;
