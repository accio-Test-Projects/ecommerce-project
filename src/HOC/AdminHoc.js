import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { adminPannelOptions } from '../constants';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

function AdminHoc({ children }) {
	const theme = useTheme();
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const [sideBarOptions, setSideBarOptions] =
		React.useState(adminPannelOptions);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const setChildClose = (path) => {
		const temp = sideBarOptions.map((item) => {
			if (item.path === path) {
				item.child_open = !item.child_open;
			}
			return item;
		});
		setSideBarOptions(temp);
	};

	const GotoThisPage = (path) => {
		navigate(path);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				sx={{ background: '#fff', color: 'black' }}
				position="fixed"
				open={open}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Welcome
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				{sideBarOptions ? (
					<>
						{' '}
						<DrawerHeader
							sx={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<div
								style={{
									fontWeight: '700',
									width: '90%',
									textAlign: 'center',
									textTransform: 'capitalize',
								}}
							>
								{' '}
								<h2>Admin</h2>
							</div>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === 'ltr' ? (
									<ChevronLeftIcon />
								) : (
									<ChevronRightIcon />
								)}
							</IconButton>
						</DrawerHeader>
						<Divider />
						<List>
							{sideBarOptions.map((option) => (
								<ListItem key={option.label} disablePadding>
									<div
										style={{
											width: '100%',
										}}
									>
										<div
											style={{
												width: '100%',
												display: 'flex',
											}}
										>
											<ListItemButton>
												<ListItemIcon>{option.icon}</ListItemIcon>
												<ListItemText
													onClick={() => GotoThisPage(option.path)}
													primary={option.label}
												/>
											</ListItemButton>
											{option.children?.length > 0 && (
												<ListItemButton
													onClick={() => setChildClose(option.path)}
												>
													{
														<div>
															{option.child_open ? (
																<ExpandLessIcon />
															) : (
																<ExpandMoreIcon />
															)}
														</div>
													}
												</ListItemButton>
											)}
										</div>
										{option.child_open &&
											option.children.map((child, j) => {
												return (
													<ListItemButton
														onClick={() => GotoThisPage(child.path)}
														sx={{
															marginLeft: '15px',
														}}
														key={j}
													>
														<ListItemIcon>{child.icon}</ListItemIcon>
														<ListItemText primary={child.label} />
													</ListItemButton>
												);
											})}
									</div>
								</ListItem>
							))}
						</List>
					</>
				) : (
					<div>loading</div>
				)}

				<Divider />
				<Button>Logout</Button>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				{children}
			</Main>
		</Box>
	);
}

export default AdminHoc;
