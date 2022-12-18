import React from 'react';
import SortableTable from '../../../../common/tables/SortableTable';

const columns = [
	{
		id: 'cat_name',
		label: 'Category',
		numeric: false,
		disablePadding: true,
	},
	{
		id: 'career_name',
		label: 'Course',
		numeric: false,
		disablePadding: true,
	},
	{
		id: 'spce_name',
		label: 'Specialization',
		numeric: false,
		disablePadding: true,
	},
	{
		id: 'career_name',
		label: 'Career Name',
		numeric: false,
		disablePadding: true,
	},
	{
		id: 'career_url',
		label: 'URL',
	},
	{
		id: 'job_pressure',
		label: 'Job Pressure',
	},
	{
		id: 'academic_pressure',
		label: 'Academic Pressure',
	},
	{
		id: 'small_content',
		label: 'Smell Content',
	},
	{
		id: 'course_level',
		label: 'Level',
	},
	{
		id: 'early_salary_start',
		label: 'Early Salary Start',
	},
	{
		id: 'midlevel_salary_start',
		label: 'Mid Level Salary Start',
	},
	{
		id: 'seniorlevel_salary_start',
		label: 'Senior Level Salary Start',
	},
	{
		id: 'priority',
		numeric: false,
		disablePadding: true,
		label: 'Priority',
	},
	{
		id: 'active',
		label: 'status',
		type: 'activated',
	},

	{
		id: 'edit',
		type: 'action',
		numeric: false,
		disablePadding: true,
		label: 'Edit',
	},
	{
		id: 'delete',
		numeric: false,
		type: 'action',
		disablePadding: true,
		label: 'Delete',
	},
];

function SchoolTypeView({ handleEdit, handleDelete, data }) {
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
				dataKeyName="content_id"
				column={columns}
				data={data}
				handleBtnClick={handleBtnClick}
			/>
		</div>
	);
}

export default SchoolTypeView;
