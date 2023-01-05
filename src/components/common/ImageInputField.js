/* eslint-disable no-console */
import { TextField } from "@mui/material";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
function ImageInputField({ label, value, dataKey,formik, required, onSave=null }) {

  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImg = async (file, dataKey) => {
    
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploadProgress(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
					setUploadProgress(0)
          if(onSave){
          onSave(downloadURL);
          }
          else{
            formik.setFieldValue(dataKey,downloadURL)
          }
        });
      }
    );
  };
  return (
    <div
      style={{
        border: " 1px solid #0000002b",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <label className="inp-label" htmlFor={dataKey}>
        {label}
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          type={"file"}
          inputProps={{ accept: ".png, .jpg, .jpeg .svg" }}
          size="small"
          sx={{
            marginTop: "10px",
            "& div": {
              borderRadius: "10px",
            },
          }}
          id={dataKey}
          name={dataKey}
         
          variant="outlined"
         
          onChange={(e) => {
            uploadImg(e.target.files[0], dataKey);
          }}
        />
        {
				uploadProgress>0?(<div>{uploadProgress} %</div>):
				value ? (
          <img
            style={{ width: "50%", maxWidth: "250px" }}
            alt="img"
            src={value}
          />
        ) : (
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              fontEeight: "600",
            }}
          >
            Select a image
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageInputField;
