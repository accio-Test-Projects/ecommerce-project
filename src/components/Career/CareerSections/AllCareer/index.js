/* eslint-disable no-console */
import {
	Button,
	Grid,
	MenuItem,
	Select,
	Switch,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import AllCareerView from './AllCareerView';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../../../store/actions';
import ImageInputField from '../../../../common/ImageInputField';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const initialValues = {
	category: [], //m d
	courseid: '', //d
	specialization: '', //d
	course_level: '', //d
	career_name: '',
	career_url: '',
	long_title: '',
	ex_college_url: '',
	show_on_home: 'N',
	career_logo: '',
	career_details_image: '',
	video_url: '',
	jobs_aspects: '',
	academic_pressure: '',
	job_pressure: '',
	small_content: '',
	early_salary_start: '',
	early_salary_end: '',
	midlevel_salary_start: '',
	midlevel_salary_end: '',
	seniorlevel_salary_start: '',
	seniorlevel_salary_end: '',
	content: '',
	large_content: '', //RTE
	meta_title: '',
	meta_description: '',
	meta_keyword: '',
	priority: '',
};
function CareerSection({ saveData }) {
	const [editBtn, setEditBtn] = useState(false);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [pageNo, setPageNo] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const dispatch = useDispatch();
	const AllCareer =
		useSelector((state) => state.openToAllData.AllCareer) || null;
	useEffect(() => {
		dispatch({ type: actionTypes.GET_ALL_CAREER, pageNo, pageSize });
	}, []);
	const formik = useFormik({
		initialValues: {
			...initialValues,
		},
		// validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
			// saveData('ADD_CAREER', values);
			setEditBtn(!editBtn);
		},
	});
	const handleEdit = (data) => {
		Object.keys(data).forEach((key) => {
			formik.setFieldValue(key, data[key]);
		});

		setEditBtn(!editBtn);
	};
	const handleDelete = (data) => {
		saveData('DELETE_CAREER', data);
	};
	const handleAddnew = () => {
		formik.setFieldValue({ ...initialValues });
		setEditBtn(!editBtn);
	};

	const onChangeEditor = (editorState) => {
		setEditorState(editorState);
		formik.setFieldValue('large_content', editorState.getCurrentContent());
	}
	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid
				sx={{
					position: 'sticky',
					top: '60px',
					background: 'white',
					padding: '10px',
					zIndex: '2',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
				item
				xs={12}
			>
				{' '}
				{editBtn ? (
					<Button
						type="submit"
						sx={{
							background: '#f50057',
							color: '#fff',
							borderRadius: '10px',
							minWidth: '100px',
							height: '40px',
						}}
					>
						Save
					</Button>
				) : (
					<Button
						onClick={handleAddnew}
						type="button"
						sx={{
							background: '#f50057',
							color: '#fff',
							borderRadius: '10px',
							minWidth: '100px',
							height: '40px',
						}}
					>
						Add New
					</Button>
				)}
			</Grid>
			{editBtn ? (
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Exam Name
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="exam_name"
							name="exam_name"
							required
							variant="outlined"
							value={formik.values.exam_name}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Course Name
						</label>
						<div>
							<Select
								required
								size="small"
								sx={{
									marginTop: '10px',
									'& div': {
										borderRadius: '10px',
									},
								}}
								labelId="demo-simple-select-autowidth-label"
								id="courseid"
								name="courseid"
								value={[formik.values.courseid]}
								onChange={formik.handleChange}
								fullWidth
							>
								{[...Array(10)].map((_, i) => {
									return (
										<MenuItem key={i} value={i + 1}>
											{i + 1}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Course Specialization
						</label>
						<div>
							<Select
								required
								size="small"
								sx={{
									marginTop: '10px',
									'& div': {
										borderRadius: '10px',
									},
								}}
								labelId="demo-simple-select-autowidth-label"
								id="specialization"
								name="specialization"
								value={[formik.values.specialization]}
								onChange={formik.handleChange}
								fullWidth
							>
								{[...Array(10)].map((_, i) => {
									return (
										<MenuItem key={i} value={i + 1}>
											{i + 1}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Course Level
						</label>
						<div>
							<Select
								required
								size="small"
								sx={{
									marginTop: '10px',
									'& div': {
										borderRadius: '10px',
									},
								}}
								labelId="demo-simple-select-autowidth-label"
								id="course_level"
								name="course_level"
								value={[formik.values.course_level]}
								onChange={formik.handleChange}
								fullWidth
							>
								{[...Array(10)].map((_, i) => {
									return (
										<MenuItem key={i} value={i + 1}>
											{i + 1}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Career Name
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="career_name"
							name="career_name"
							required
							variant="outlined"
							value={formik.values.career_name}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Career URL
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="career_url"
							name="career_url"
							required
							variant="outlined"
							value={formik.values.career_url}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Course Detail Page Title
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="long_title"
							name="long_title"
							required
							variant="outlined"
							value={formik.values.long_title}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Career College URL
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="ex_college_url"
							name="ex_college_url"
							required
							variant="outlined"
							value={formik.values.ex_college_url}
							onChange={formik.handleChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<label className="inp-label" htmlFor="attribute_set">
							Show on Home
						</label>
						<Switch
							color="secondary"
							checked={formik.values.show_on_home == 'Y'}
							onChange={(e) =>
								formik.setFieldValue(
									'show_on_home',
									e.target.checked ? 'Y' : 'N'
								)
							}
						/>
					</Grid>

					<Grid item xs={12}>
						<ImageInputField
							label={'Career Logo'}
							value={formik.values.career_logo}
							required={false}
							formik={formik}
							key={'career_logo'}
						/>
					</Grid>
					<Grid item xs={12}>
						<ImageInputField
							label={'Career Detail image'}
							value={formik.values.career_details_image}
							required={false}
							formik={formik}
							key={'career_details_image'}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Youtube Embed URL
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="video_url"
							name="video_url"
							required
							variant="outlined"
							value={formik.values.video_url}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Job Aspects
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="jobs_aspects"
							name="jobs_aspects"
							required
							variant="outlined"
							value={formik.values.jobs_aspects}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="job_pressure">
							Job Pressure
						</label>
						<div>
							<Select
								required
								size="small"
								sx={{
									marginTop: '10px',
									'& div': {
										borderRadius: '10px',
									},
								}}
								labelId="demo-simple-select-autowidth-label"
								id="job_pressure"
								name="job_pressure"
								value={[formik.values.job_pressure]}
								onChange={formik.handleChange}
								fullWidth
							>
								{[...Array(10)].map((_, i) => {
									return (
										<MenuItem key={i} value={i + 1}>
											{i + 1}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="academic_pressure">
							Acadmic Pressure
						</label>
						<div>
							<Select
								required
								size="small"
								sx={{
									marginTop: '10px',
									'& div': {
										borderRadius: '10px',
									},
								}}
								labelId="demo-simple-select-autowidth-label"
								id="academic_pressure"
								name="academic_pressure"
								value={[formik.values.academic_pressure]}
								onChange={formik.handleChange}
								fullWidth
							>
								{[...Array(10)].map((_, i) => {
									return (
										<MenuItem key={i} value={i + 1}>
											{i + 1}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="small_content">
							Small content
						</label>
						<TextareaAutosize
							minRows={4}
							// size="small"
							style={{
								minWidth: '100%',
								marginTop: '10px',
								borderRadius: '10px',
							}}
							fullWidth
							id="small_content"
							name="small_content"
							required
							variant="outlined"
							value={formik.values.small_content}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="early_salary_start">
							Early Salary Start
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="early_salary_start"
							name="early_salary_start"
							required
							variant="outlined"
							value={formik.values.early_salary_start}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="early_salary_end">
							Early Salary End
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="early_salary_end"
							name="early_salary_end"
							required
							variant="outlined"
							value={formik.values.early_salary_end}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="midlevel_salary_start">
							Mid Level Salary Start
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="midlevel_salary_start"
							name="midlevel_salary_start"
							required
							variant="outlined"
							value={formik.values.midlevel_salary_start}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="midlevel_salary_end">
							Mid Level Salary End
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="midlevel_salary_end"
							name="midlevel_salary_end"
							required
							variant="outlined"
							value={formik.values.midlevel_salary_end}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="seniorlevel_salary_start">
							Senior Level Salary Start
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="seniorlevel_salary_start"
							name="seniorlevel_salary_start"
							required
							variant="outlined"
							value={formik.values.seniorlevel_salary_start}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="seniorlevel_salary_end">
							Senior Level Salary End
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="seniorlevel_salary_end"
							name="seniorlevel_salary_end"
							required
							variant="outlined"
							value={formik.values.seniorlevel_salary_end}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="content">
							content
						</label>
						<TextareaAutosize
							minRows={4}
							// size="small"
							style={{
								minWidth: '100%',
								marginTop: '10px',
								borderRadius: '10px',
							}}
							fullWidth
							id="content"
							name="content"
							required
							variant="outlined"
							value={formik.values.content}
							onChange={formik.handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<Editor
							editorState={editorState}
							onChange={onChangeEditor}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="meta_title">
							Meta Title
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="meta_title"
							name="meta_title"
							required
							variant="outlined"
							value={formik.values.meta_title}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="meta_keyword">
							Meta Keyword
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="meta_keyword"
							name="meta_keyword"
							required
							variant="outlined"
							value={formik.values.meta_keyword}
							onChange={formik.handleChange}
						/>
					</Grid>

					<Grid item xs={6}>
						<label className="inp-label" htmlFor="meta_description">
							Meta Description
						</label>
						<TextField
							size="small"
							sx={{
								marginTop: '10px',
								'& div': {
									borderRadius: '10px',
								},
							}}
							fullWidth
							id="meta_description"
							name="meta_description"
							required
							variant="outlined"
							value={formik.values.meta_description}
							onChange={formik.handleChange}
						/>
					</Grid>
					<Grid item xs={6}>
						<label className="inp-label" htmlFor="product_name">
							Priority
						</label>
						<div>
							<Select
								required
								size="small"
								sx={{
									marginTop: '10px',
									'& div': {
										borderRadius: '10px',
									},
								}}
								labelId="demo-simple-select-autowidth-label"
								id="priority"
								name="priority"
								value={[formik.values.priority]}
								onChange={formik.handleChange}
								fullWidth
							>
								{[...Array(10)].map((_, i) => {
									return (
										<MenuItem key={i} value={i + 1}>
											{i + 1}
										</MenuItem>
									);
								})}
							</Select>
						</div>
					</Grid>
				</Grid>
			) : AllCareer && AllCareer.length === 0 ? (
				<div>no data</div>
			) : AllCareer && AllCareer.length > 0 ? (
				<AllCareerView
					pageNo={pageNo}
					setPageNo={setPageNo}
					pageSize={pageSize}
					setPageSize={setPageSize}
					data={AllCareer}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			) : (
				<div>loading</div>
			)}
		</form>
	);
}

export default React.memo(CareerSection);
