import * as React from 'react';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Icon from '../icon';
import addIcon from '../../assets/add.png';
import projectIcon from '../../assets/projectIcon.png';
import experimentIcon from '../../assets/folderClosed.png';

export default function AddItemsMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				variant="small"
				color="secondary"
				disableRipple
				startIcon={<Avatar src={addIcon} sx={{ width: 16, height: 16 }} />}
				onClick={handleClick}
			>
				Add item
			</Button>
			<Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose} disableRipple>
					<Icon src={projectIcon} type="static" alt="projectIcon" />
					<Typography variant="subtitle2">Project</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose} disableRipple>
					<Icon src={experimentIcon} type="static" alt="experimentIcon" />
					<Typography variant="subtitle2">Experiment</Typography>
				</MenuItem>
			</Menu>
		</>
	);
}
