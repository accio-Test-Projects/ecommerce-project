import React from 'react';
import SortableTable from '../../../common/tables/SortableTable';

const columns = [
	{
		id: 'productName',
		label: 'Product name',
	},
	{
		id:'productPrice',
		label:'Price'
	},
	{
		id:"productInventory",
		label:"Stock"
	},
	{
		id:'productCategory',
		label:'Category'
	},
	{
		id:'delete',
		label:'Delete',
		type:'action',
	},
	{
		id:'edit',
		label:'Edit',
		type:'action',
	}
	
];

function AllProductsView({ handleEdit, handleDelete, data }) {
	const handleBtnClick = (type, data) => {
		if (type === 'edit') {
			handleEdit(data);
		}
		if (type === 'delete') {
			handleDelete(data);
		}
	};
	return (
		<div>
			<SortableTable
				dataKeyName="product_id"
				column={columns}
				data={data}
				handleBtnClick={handleBtnClick}
			/>
		</div>
	);
}

export default AllProductsView;
