import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AdjustIcon from '@mui/icons-material/Adjust';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';


export const adminPannelOptions = [
	{
		label: 'Dashboard',
		icon: <DashboardIcon />,
		path: '/admin/dashboard',
		children: [],
	},
	{
		label: 'Landing Page',
		icon: <SchoolIcon />,
		path: '/admin/landingpage',
		child_open: false,
	},
	{
		label: 'Prducts',
		icon: <LocalLibraryIcon />,
		path: '/admin/products',
	},

	{
		label: 'Orders',
		icon: <SchoolIcon />,
		path: '/admin/orders',
		child_open: false,
	},
	{
		label: 'Example',
		icon: <LightbulbIcon />,
		path: '/admin/example',
		child_open: false,
	}

];
