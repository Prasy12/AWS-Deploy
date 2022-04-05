import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Icon from '../icon';
import folderClosed from '../../assets/folderClosed.png';
import arrowRightAltIcon from '../../assets/arrowRight.png';
import covalentExperimentsIcon from '../../assets/covalentExperimentsIcon.png';
import projectIcon from '../../assets/projectIcon.png';
import searchIcon from '../../assets/search.png';
import './style.css';

export default function MoveItemsMenu(props) {
	const { open, closeMoveMenu, anchorEl } = props;

	const projects = {
		number: '5',
		list: ['Project Alpha', 'Project Gamma']
	};

	const experiments = {
		number: '5',
		list: ['Experiment Zeta', 'Experiment Zephyr']
	};

	const moveItems = () => {
		console.log('DispatchesMoved');
		closeMoveMenu();
	};

	return (
		<Menu
			variant="menu"
			anchorEl={anchorEl}
			open={open}
			onClose={closeMoveMenu}
			PaperProps={{
				sx: {
					maxHeight: '300px',
					width: '344px'
				}
			}}
		>
			<ListItemText className="menuItemAlign">
				<Typography>Move {projects.number} items to ...</Typography>
			</ListItemText>
			<MenuItem disableRipple>
				<Icon src={searchIcon} type="static" alt="searchIcon" />
				<InputBase
					name="noAutoFill"
					id="search-jha"
					// title={placeholder}
					// className={classes.searchInput}
					placeholder="Search"
					// onChange={this.onJhaSearch}
				/>
				{/* {isClear && (
						<ClearIcon
							color="primary"
							className=" cursor-pointer"
							onClick={this.clearSearch}
						/>
					)} */}
			</MenuItem>
			<List>
				<ListItem className="menuItemAlign">
					<Icon src={projectIcon} type="static" alt="projectIcon" />
					<Typography color="textSecondary">Projects</Typography>
				</ListItem>
				{projects.list.map(listItems => (
					<MenuItem onClick={moveItems} disableRipple key={listItems} className="subMenuItemAlign">
						<Icon src={projectIcon} type="static" alt="projectIcon" />
						<Typography variant="subtitle2">{listItems}</Typography>
					</MenuItem>
				))}
			</List>
			<List>
				<ListItem className="menuItemAlign">
					<Icon src={covalentExperimentsIcon} type="static" alt="covalentExperimentsIcon" />
					<Typography color="textSecondary">Experiments</Typography>
				</ListItem>
				{experiments.list.map(listItems => (
					<MenuItem onClick={moveItems} disableRipple key={listItems} className="subMenuItemAlign">
						<Icon src={folderClosed} type="static" alt="folderClosed" />
						<Typography variant="subtitle2">{listItems}</Typography>
					</MenuItem>
				))}
			</List>
			<ListItemText className="buttonItem">
				<Button sx={{ backgroundColor: '#1E1E2E' }} onClick={moveItems}>
					<Icon src={arrowRightAltIcon} type="static" alt="arrowRightAltIcon" />
					<Typography color="textPrimary">Move</Typography>
				</Button>
			</ListItemText>
		</Menu>
	);
}
