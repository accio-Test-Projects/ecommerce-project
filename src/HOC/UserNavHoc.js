import { Button } from "@mui/material";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import {useContext} from 'react';
import {userContext} from '../Context/userContext';
function UserNavHoc({ children }) {
  const [state, dispatch] = useContext(userContext);
  const login = () => {
    console.log("login");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        console.log(result);
        dispatch({type:'LOGIN',payload:result.user})
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const logout = () => {
    console.log("logout");
    dispatch({type:'LOGOUT'})
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "sticky",
          top: "0px",
          background: "#2f2fee61",
          color: "black",
        }}
      >
        {state.isAuth?(<Button
        onClick={()=>logout()}
        >Logout</Button>):(<Button onClick={login}>Login</Button>)}
      </div>
      {children}
    </div>
  );
}

export default UserNavHoc;
