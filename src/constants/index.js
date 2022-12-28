import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AdjustIcon from '@mui/icons-material/Adjust';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';


export const locationDropDownOptions=[
	{
		label: '110023',
		value: '110023',
	},
	{
		label: '110024',
		value: '110024',
	},
	{
		label: '110025',
		value: '110025',
	},
	{
		label: '110026',
		value: '110026',
	},
	{
		label: '110027',
		value: '110027',
	}
]
export const ProductCategories = [
	{
		label: 'Books',
		value: 'books',
	},
	{
		label: 'Men Clothing',
		value: 'men_clothing',
	},
	{
		label: 'Women Clothing',
		value: 'women_clothing',
	},
	{
		label: 'Electronics',
		value: 'electronics',
	},
]
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
