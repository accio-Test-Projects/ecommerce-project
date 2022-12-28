import * as ActionsType from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
export const AddProduct = async ({ values, setEditBtn, resetForm }) => {
  try {
    // Add a new document in collection "cities"
    //addDoc(collectionRef, data)
    //collectionRef(database,'collectionName)
    const product_id = uuidv4();
    await setDoc(doc(db, "products", product_id), {
      ...values,
      product_id,
    });
    alert("Product added");
    setEditBtn((p) => !p);
    resetForm();
  } catch (error) {
    console.log(error);
    alert("Error adding document");
  }
};

export const getAllProducts = async (data) => {
  let AllProducts = [];
  try {
    //1 we need to get all the docs from the firestore specificlly from the products collection
    //getDocs(collectionRef)
    // collectionRef(database,collectionName)
    const querySnapshot = await getDocs(collection(db, "products"));

    querySnapshot.forEach((doc) => {
      AllProducts.push(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
  return AllProducts;
};

export const deleteProduct = async (data) => {

  await deleteDoc(doc(db, "products", data.product_id));
};
