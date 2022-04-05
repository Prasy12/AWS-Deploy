import React from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import './style.css';
import covalentLogo from '../../assets/covalentLogo.png';
import covalentSettingsIcon from '../../assets/covalentSettingsIcon.png';
import covalentHardwareIcon from '../../assets/covalentHardwareIcon.png';
import covalentExperimentsIcon from '../../assets/covalentExperimentsIcon.png';
import Icon from '../icon';

function NavBar() {
	const clickHandler = () => {
		console.log('clicked');
	};

	return (
		<Paper square className="navbar">
			<Icon src={covalentLogo} clickHandler={clickHandler} alt="covalentLogo" type="static" />
			<Grid
				container
				elevation={0}
				direction="column"
				justifyContent="space-evenly"
				alignItems="center"
				className="navIcons"
			>
				<Grid elevation={0} className="iconActive">
					<Icon
						src={covalentExperimentsIcon}
						status="active"
						clickHandler={clickHandler}
						alt="covalentExperimentsIcon"
						type="pointer"
					/>
				</Grid>
				<Grid elevation={0}>
					<Icon
						src={covalentHardwareIcon}
						clickHandler={clickHandler}
						alt="covalentHardwareIcon"
						type="pointer"
					/>
				</Grid>
				<Grid elevation={0}>
					<Icon
						src={covalentSettingsIcon}
						clickHandler={clickHandler}
						alt="covalentSettingsIcon"
						type="pointer"
					/>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default NavBar;
