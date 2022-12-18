import React from 'react';
import { CircularProgress } from '@mui/material';

function CustomLoadingBtn({ size = 24 }) {
	return <CircularProgress size={size} />;
}

export default CustomLoadingBtn;
