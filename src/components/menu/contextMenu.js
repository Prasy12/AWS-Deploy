import * as React from 'react';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Icon from '../icon';
import moreVerticalIcon from '../../assets/menuVerticalIcon.png';
import archiveIcon from '../../assets/archive.png';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';
import pinIcon from '../../assets/pin.png';
import restartIcon from '../../assets/restart.png';
import moveIcon from '../../assets/arrowRight.png';
import MoveItemMenu from './moveItemsMenu';
import './style.css';

export default function ContextMenu(props) {
	// const { anchorEl, handleClick, handleClose, handleArchive, handleDelete, handleEdit, handleMove, handleRestart, open } = props;
	const { type, dispatch, pinDispatch } = props;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorElMove, setAnchorElMove] = React.useState(null);
	const [moveMenuOpen, setMoveMenu] = React.useState(false);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleArchive = () => {
		console.log('Archive');
		handleClose();
	};

	const handleEdit = () => {
		console.log('Edit');
		handleClose();
	};

	const handleDelete = () => {
		console.log('Delete');
		handleClose();
	};

	const handleRestart = () => {
		console.log('Restart');
		handleClose();
	};

	const handleMove = event => {
		console.log('Move');
		handleClose();
		// setAnchorElMove(event.currentTarget);
		// setMoveMenu(!moveMenuOpen);
	};

	const handlePin = event => {
		pinDispatch(dispatch.id, dispatch.isPinned, dispatch.name);
		handleClose();
	};

	const closeMoveMenu = () => {
		console.log('Move menu closed');
		setMoveMenu(!moveMenuOpen);
	};

	return (
		<Grid>
			<Icon
				src={moreVerticalIcon}
				type="pointer"
				clickHandler={handleClick}
				alt="moreVerticalIcon"
			/>
			<Menu
				variant="menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				keepMounted={false}
				getContentAnchorEl={null}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				PaperProps={{
					style: {
						maxHeight: '300px',
						width: '170px',
						transform: 'translateX(-5px) translateY(5px)'
					}
				}}
			>
				{type === 'dispatch' && (
					<MenuItem onClick={handleRestart} disableRipple>
						<Icon src={restartIcon} type="static" alt="searchIcon" />
						<Typography variant="subtitle2">Restart</Typography>
					</MenuItem>
				)}
				{type === 'dispatch' && (
					<MenuItem onClick={handlePin} disableRipple>
						<Icon src={pinIcon} type="static" alt="pinIcon" />
						<Typography variant="subtitle2">
							{dispatch && dispatch.isPinned ? 'Unpin' : 'Pin'}
						</Typography>
					</MenuItem>
				)}
				{type !== 'unCategorized' && (
					<MenuItem onClick={handleEdit} disableRipple>
						<Icon src={editIcon} type="static" alt="editIcon" />
						<Typography variant="subtitle2">Edit</Typography>
					</MenuItem>
				)}
				{(type !== 'project' || type !== 'unCategorized') && (
					<MenuItem onClick={handleMove} disableRipple>
						<Icon src={moveIcon} type="static" alt="moveIcon" />
						<Typography variant="subtitle2">Move to</Typography>
					</MenuItem>
				)}
				<MenuItem onClick={handleArchive} disableRipple>
					<Icon src={archiveIcon} type="static" alt="archiveIcon" />
					<Typography variant="subtitle2">Archive</Typography>
				</MenuItem>
				<MenuItem onClick={handleDelete} disableRipple>
					<Icon src={deleteIcon} type="static" alt="deleteIcon" />
					<Typography variant="subtitle2">Delete</Typography>
				</MenuItem>
			</Menu>
			<MoveItemMenu open={moveMenuOpen} anchorEl={anchorElMove} closeMoveMenu={closeMoveMenu} />
		</Grid>
	);
}
