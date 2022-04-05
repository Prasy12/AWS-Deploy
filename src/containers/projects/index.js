import * as React from 'react';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Icon from '../../components/icon';
import searchIcon from '../../assets/search.png';
import closeIcon from '../../assets/close.png';
import AllListView from '../../components/list/experiments/allListView';
import ExperimentsListView from '../../components/list/experiments/experimentsListView';
import DispatchesListView from '../../components/list/experiments/dispatchesListView';
import ShowItemsMenu from '../../components/menu/showItemsMenu';
import AddItemsMenu from '../../components/menu/addItemsMenu';
import { DISPATCH_HEADER } from '../../constants/tableHeaderConstants';
import DispatchCard from '../../components/card/dispatchCard';
import {
	highlightedDispatchesList,
	allItemsList,
	hierarchyList,
	pinDispatches
} from '../../api/experiments/dispatchApi';
import './style.css';

export default function Projects() {
	const timeFormatter = time => {
		return moment().startOf('day').seconds(time).format('HH[h] mm[m] ss[s]');
	};
	const [isAction, setIsAction] = React.useState(false);
	const [openLoader, setOpenLoader] = React.useState(false);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');

	// filter tab state variables
	const [value, setValue] = React.useState('1');
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};

	// highlighted dispatches view api and state variables
	const [highlightedDispatches, setHighlightedDispatches] = React.useState([]);
	const highlightedDispatchesListApi = () => {
		highlightedDispatchesList(4)
			.then(response => {
				setHighlightedDispatches(response);
			})
			.catch(error => {
				console.log(error);
			});
	};
	React.useEffect(() => {
		highlightedDispatchesListApi();
	}, [isAction]);

	// all quick filter state variables
	const [unCategorized, setUncategorized] = React.useState({});
	const [allProjects, setAllProjects] = React.useState([]);
	const [allExperiments, setAllExperiments] = React.useState([]);

	// experiment quick filter state variables
	const [onlyExperiments, setOnlyExperiments] = React.useState([]);

	// dispatch quick filter state variables
	const [onlyDispatches, setOnlyDispatches] = React.useState([]);

	const dispatchListApi = type => {
		setOpenLoader(true);
		if (value === '1') type = 'all';
		else if (value === '2') type = 'experiments';
		else type = 'dispatches';
		allItemsList(type)
			.then(response => {
				if (value === '1') {
					setUncategorized(response.data.unCategorized);
					setAllProjects(response.data.projects);
					setAllExperiments(response.data.experiments);
				} else if (value === '2') setOnlyExperiments(response.data);
				else setOnlyDispatches(response.data);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setOpenLoader(false);
			});
	};
	React.useEffect(() => {
		dispatchListApi();
	}, [value, isAction]);

	// handles projects opened in all filter
	const handleOpenAllProjects = (mainIndex, type, open, secondaryIndex, tertiaryIndex) => {
		if (type === 'allProjects') {
			const data = allProjects;
			if (open === true) {
				data[mainIndex].isOpen = open;
				data[mainIndex].isLoader = true;
				hierarchyList(data[mainIndex].id, 'project')
					.then(response => {
						const experimentList = response.data?.experiments.map(e => {
							return {
								...e,
								isOpen: false
							};
						});
						const dispatchList = response.data?.dispatches;
						data[mainIndex].experiments = experimentList;
						data[mainIndex].dispatches = dispatchList;
						data[mainIndex].isLoader = false;
						setAllProjects([...data]);
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				data[mainIndex].isOpen = open;
				setAllProjects([...data]);
			}
		} else if (type === 'allProjectExperiments') {
			const data = allProjects;
			if (open === true) {
				data[mainIndex].experiments[secondaryIndex].isOpen = open;
				hierarchyList(data[mainIndex].id, 'experiment')
					.then(response => {
						const dispatchList = response.data?.dispatches;
						data[mainIndex].experiments[secondaryIndex].dispatches = dispatchList;
						data[mainIndex].experiments[secondaryIndex].isLoader = false;
						setAllProjects([...data]);
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				data[mainIndex].experiments[secondaryIndex].isOpen = open;
				setAllProjects([...data]);
			}
		}
	};

	// handles experiments opened in all filter
	const handleOpenAllExperiments = (mainIndex, open) => {
		const data = allExperiments;
		if (open === true) {
			data[mainIndex].isOpen = open;
			data[mainIndex].isLoader = true;
			hierarchyList(data[mainIndex].id, 'experiment')
				.then(response => {
					const dispatchList = response.data?.dispatches;
					data[mainIndex].dispatches = dispatchList;
					data[mainIndex].isLoader = false;
					setAllExperiments([...data]);
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			data[mainIndex].isOpen = open;
			setAllExperiments([...data]);
		}
	};

	// handles unCategorized opened in all filter
	const handleOpenUnCategorized = open => {
		const data = unCategorized;
		if (open === true) {
			data.isOpen = open;
			data.isLoader = true;
			hierarchyList(data.id, 'unCategorized')
				.then(response => {
					const dispatchList = response.data?.dispatches;
					data.dispatches = dispatchList;
					data.isLoader = false;
					setUncategorized({ ...data });
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			data.isOpen = open;
			setUncategorized({ ...data });
		}
	};

	// handles experiment filter changes
	const handleOpenExperiments = (mainIndex, open) => {
		const data = onlyExperiments;
		if (open === true) {
			data[mainIndex].isOpen = open;
			data[mainIndex].isLoader = true;
			hierarchyList(data[mainIndex].id, 'experiment')
				.then(response => {
					const dispatchList = response.data?.dispatches;
					data[mainIndex].dispatches = dispatchList;
					data[mainIndex].isLoader = false;
					setOnlyExperiments([...data]);
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			data[mainIndex].isOpen = open;
			setOnlyExperiments([...data]);
		}
	};

	// handle context menu actions.
	const onPin = (id, pinned, name) => {
		const params = {
			id: [id]
		};
		const message = `${name} has been ${pinned ? 'unpinned' : 'pinned'} successfully!`;
		pinDispatches(params).then(response => {
			setIsAction(!isAction);
			setSnackbarMessage(message);
			setOpenSnackbar(true);
		});
	};

	return (
		<Grid container>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={1000}
				message={snackbarMessage}
				action={<Icon type="pointer" src={closeIcon} clickHandler={() => setOpenSnackbar(false)} />}
			/>
			<Backdrop open={openLoader}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Typography variant="h1">Experiments</Typography>
			<Grid container direction="row" className="containerSpacing">
				{highlightedDispatches.map(dispatch => (
					<DispatchCard
						dispatch={dispatch}
						key={dispatch.name}
						timeFormatter={timeFormatter}
						onPin={onPin}
					/>
				))}
			</Grid>
			<Grid container className="containerSpacing">
				<Grid item xs={6}>
					<TabContext value={value}>
						<TabList onChange={handleTabChange}>
							<Tab disableRipple label="All" value="1" />
							<Divider orientation="vertical" variant="middle" flexItem />
							<Tab disableRipple label="Experiments" value="2" />
							<Divider orientation="vertical" variant="middle" flexItem />
							<Tab disableRipple label="Dispatches" value="3" />
						</TabList>
					</TabContext>
				</Grid>
				<Grid item xs={3} className="buttonGrid">
					<ShowItemsMenu />
					<AddItemsMenu />
				</Grid>
				<Grid className="searchGrid">
					<InputBase
						name="noAutoFill"
						id="search-jha"
						placeholder="Search"
						sx={{ width: '290px', border: '1px solid white' }}
						startAdornment={<Icon src={searchIcon} type="static" alt="searchIcon" />}
					/>
				</Grid>
			</Grid>
			<Grid container className="root" style={{ marginTop: '0.625rem' }}>
				{value === '1' && (
					<AllListView
						unCategorized={unCategorized}
						allProjects={allProjects}
						allExperiments={allExperiments}
						header={DISPATCH_HEADER}
						handleOpenAllProjects={handleOpenAllProjects}
						handleOpenUnCategorized={handleOpenUnCategorized}
						handleOpenAllExperiments={handleOpenAllExperiments}
						timeFormatter={timeFormatter}
						onPin={onPin}
						orderBy="lastUpdated"
						order="desc"
					/>
				)}
				{value === '2' && (
					<ExperimentsListView
						onlyExperiments={onlyExperiments}
						header={DISPATCH_HEADER}
						onPin={onPin}
						handleOpen={handleOpenExperiments}
						timeFormatter={timeFormatter}
						orderBy="lastUpdated"
						order="desc"
					/>
				)}
				{value === '3' && (
					<DispatchesListView
						onlyDispatches={onlyDispatches}
						header={DISPATCH_HEADER}
						onPin={onPin}
						timeFormatter={timeFormatter}
						orderBy="lastUpdated"
						order="desc"
					/>
				)}
			</Grid>
		</Grid>
	);
}
