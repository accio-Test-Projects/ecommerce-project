import { TextField } from '@mui/material'
import React from 'react'

function CommonTextField() {
  return (
    <TextField
					size='small'
					sx={{
						marginTop: '10px',
						'& div':{
							borderRadius:'10px'
						}
					}}
						fullWidth
						value={formik.values.set_product_new_date.to}
						onChange={(e) =>
							formik.setFieldValue('set_product_new_date', {
								...formik.values.set_product_new_date,
								to: e.target.value,
							})
						}
						ty
  )
}

export default CommonTextField