import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function CommonLoader() {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
    }}
    >
   <CircularProgress
   color="secondary"
   
   />
   </div>
  )
}

export default CommonLoader