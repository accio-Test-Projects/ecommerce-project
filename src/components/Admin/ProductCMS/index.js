/* eslint-disable no-console */
import React from 'react';

import AllProducts from './AllProducts';
// import { useNavigate } from 'react-router-dom';
import './Products.css';


function ProductCMS({saveData}) {

	return (
		<div>
		<AllProducts  saveData={saveData} />
		</div>
	)
}

export default React.memo(ProductCMS);
