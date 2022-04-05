import * as React from 'react';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Icon from '../icon';
import showIcon from '../../assets/show.png';
import caretDown from '../../assets/caretDown.png';
import archiveIcon from '../../assets/archive.png';

export default function ShowItemsMenu(props) {
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
				startIcon={<Avatar src={showIcon} sx={{ width: 16, height: 16 }} />}
				endIcon={<Avatar src={caretDown} sx={{ width: 16, height: 16 }} />}
				onClick={handleClick}
			>
				Show
			</Button>
			{/* <Icon src={showIcon} type='static' clickHandler={handleClick} />
            <Typography variant='h2' color='textSecondary' style={{ justifyContents: 'center', display: 'flex', alignItems: 'center' }}>Show</Typography>
            <Icon src={caretDown} type='static' /> */}
			<Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
				<MenuItem onClick={handleClose} disableRipple>
					<Checkbox color="primary" size="small" />
					<Icon src={archiveIcon} type="static" alt="archiveIcon" />
					<Typography variant="subtitle2">Archived</Typography>
				</MenuItem>
				<MenuItem onClick={handleClose} disableRipple>
					<Checkbox color="primary" size="small" />
					<Typography variant="subtitle2">Only uncategorized</Typography>
				</MenuItem>
			</Menu>
		</>
	);
}
