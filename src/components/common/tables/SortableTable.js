import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Box, Button, Chip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Moment from 'react-moment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
// import CloseIcon from '@mui/icons-material/Close';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		headCells,
		multiSelect,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{multiSelect && (
					<TableCell padding="checkbox">
						<Checkbox
							color="primary"
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': 'select all desserts',
							}}
						/>
					</TableCell>
				)}
				{headCells.map((headCell) => (
					<TableCell
						sx={{
							fontWeight: 'bold',
						}}
						key={headCell.id}
						align={headCell.type === 'action' ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'normal' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
	multiSelect: PropTypes.bool,
};

function EnhancedTableToolbar(props) {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}
		>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: '1 1 100%' }}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					All Data
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

function SortableTable({
	data,
	column,
	handleBtnClick,
	dataKeyName,
	multiSelect = false,
	// setPageNo=null
	// pageNo=1,
}) {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = data.map((n) => n[dataKeyName]);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={'medium'}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							headCells={column}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
							multiSelect={multiSelect}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
							{stableSort(data, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row[dataKeyName]);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row[dataKeyName])}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row[dataKeyName]}
											selected={isItemSelected}
										>
											{multiSelect && (
												<TableCell padding="checkbox">
													<Checkbox
														color="primary"
														checked={isItemSelected}
														inputProps={{
															'aria-labelledby': labelId,
														}}
													/>
												</TableCell>
											)}

											{column.map((item, index) => {
												if (item.type === 'boolean') {
													return (
														<TableCell align="left" key={index}>
															{row[item.id] ? 'Yes' : 'No'}
														</TableCell>
													);
												} else if (item.type === 'action') {
													return (
														<TableCell key={item.id} align="right">
															<Button
																variant="contained"
																sx={{
																	backgroundColor:
																		item.label === 'Edit'
																			? '#0078e4'
																			: '#f44336',
																	minWidth: '30px',
																	maxHeight: '30px',
																	padding: '15px 10px',
																}}
																onClick={() => handleBtnClick(item.id, row)}
															>
																{item.label === 'Edit' ? (
																	<BorderColorIcon sx={{ width: '20px' }} />
																) : (
																	<DeleteForeverIcon sx={{ width: '20px' }} />
																)}
															</Button>
														</TableCell>
													);
												} else if (item.type === 'date') {
													return (
														<TableCell key={item.id} align="right">
															<Moment format="DD/MM/YYYY">
																{row[item.id]}
															</Moment>
														</TableCell>
													);
												} else if (item.type === 'image') {
													if (row[item.id] === '') {
														return (
															<TableCell key={item.id} align="left">
																<img
																	src={
																		'https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png'
																	}
																	alt="image"
																	width="50px"
																	height="50px"
																/>
															</TableCell>
														);
													} else {
														return (
															<TableCell key={item.id} align="left">
																<img
																	src={
																		'https://cdn.cleverism.com/wp-content/themes/cleverism/assets/img/src/logo-placeholder.png'
																	}
																	alt="image"
																	width="50px"
																	height="50px"
																/>
															</TableCell>
														);
													}
												} else if (item.type === 'activated') {
													return (
														<TableCell key={item.id} align="left">
															{row[item.id] === 'Y' ||
															row[item.id] === true ||
															row[item.id] === 'YES' ? (
																<Chip
																	label="Activated"
																	color="success"
																	size="small"
																/>
															) : (
																<Chip
																	label="Deactivated"
																	color="error"
																	size="small"
																/>
															)}
														</TableCell>
													);
												} else {
													return (
														<TableCell align="left" key={index}>
															{row[item.id]}
														</TableCell>
													);
												}
											})}
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25, 50]}
					component="div"
					count={data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}

export default SortableTable;
