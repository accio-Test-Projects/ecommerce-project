/* eslint-disable no-console */
import { TextField } from '@mui/material';
import React from 'react';

function ImageInputField({ label, value, key, required, formik }) {
	const [imgshow, setImgshow] = React.useState('');
	const uploadImg = async (file, key) => {
		let reader = new FileReader();
		await reader.readAsDataURL(file);
		reader.onload = () => {
			// S3 upload
			setImgshow(reader.result);
		};
		reader.onerror = function (error) {
			console.log('Error: ', error);
		};

		formik.setFieldValue(key, file.path);
	};
	return (
		<div
			style={{
				border: ' 1px solid #0000002b',
				padding: '10px',
				borderRadius: '10px',
			}}
		>
			<label className="inp-label" htmlFor={key}>
				{label}
			</label>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<TextField
					type={'file'}
					inputProps={{ accept: '.png, .jpg, .jpeg .svg' }}
					size="small"
					sx={{
						marginTop: '10px',
						'& div': {
							borderRadius: '10px',
						},
					}}
					id={key}
					name={key}
					required={required}
					variant="outlined"
					value={value}
					onChange={(e) => {
						uploadImg(e.target.files[0], 'career_logo');
					}}
				/>
				{imgshow ? (
					<img
						style={{ width: '50%', maxWidth: '250px' }}
						alt="image"
						src={imgshow}
					/>
				) : (
					<div
						style={{
							width: '50%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '20px',
							fontEeight: '600',
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
