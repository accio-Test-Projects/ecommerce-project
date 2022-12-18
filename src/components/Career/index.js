/* eslint-disable no-console */
import React from 'react';
import { useDispatch } from 'react-redux';
import * as actionTypes from '../../../store/actions';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AllCareer from './CareerSections/AllCareer';
// import { useNavigate } from 'react-router-dom';
import './CareerSections.css';


function Career() {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);
	// const navigate = useNavigate();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// const navigate = useNavigate();
	const saveData = (type,values) => {
		console.log(values, '----', type);
		if(type === 'ADD_CAREER'){
			if(values.school_id){
				let update = {...values}
				delete update.content_id 
				dispatch({
					type: actionTypes.UPDATE_CAREER,
					payload: {
						content_id : values.content_id ,
						update
					},
					
				})
			}
			else{
				dispatch({
					type: actionTypes.POST_CAREER,
					payload: values,
				})
			}
			
		}
		if(type === 'DELETE_SCHOOL_TYPE'){
			console.log('delete school type')
			dispatch({
				type: actionTypes.DELETE_CAREER,
				payload: {
					"content_id": values.content_id ,
				}
			})
		}
	};

	let renderSections = [
		{
			label: 'Career Table',
			component: <AllCareer  saveData={saveData} />,
		},		
	];

	return (
		<div>
			<h2>{`Career Section`}</h2>
			<Box sx={{ width: '100%' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					textColor="secondary"
					indicatorColor="secondary"
					aria-label="secondary tabs example"
				>
					{renderSections.map((item, index) => {
						return (
							<Tab
								key={index}
								value={index}
								label={item.label}
								
							/>
						);
					})}
				</Tabs>
				<div className="product-section-container">
					{renderSections[value].component}
				</div>
			</Box>
		</div>
	);
}

export default React.memo(Career);
