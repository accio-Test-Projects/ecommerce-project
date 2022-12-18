import React from 'react'
import constructionimg from '../../assets/under-construction.gif'
function UnderConstruction() {
  return (
    <center>
			<img
			style={{
				maxWidth: '400px',
			}}
			src={constructionimg}
			/>
			<h2>Under Construction</h2>
			</center>
  )
}

export default UnderConstruction