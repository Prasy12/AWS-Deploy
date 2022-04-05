import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import CardContent from '@mui/material/CardContent';
import dispatchIcon from '../../assets/dispatchIcon.png';
import pinIcon from '../../assets/pin.png';
import dispatchSuccess from '../../assets/dispatchSuccess.png';
import dispatchRunning from '../../assets/dispatchRunning.png';
import dispatchError from '../../assets/dispatchError.png';
import Icon from '../icon/index';
import ContextMenu from '../menu/contextMenu';
import './style.css';

function DispatchCard(props) {
	const { dispatch, onClick, onPin, timeFormatter } = props;

	return (
		<Card square className="cardContainer">
			<CardHeader
				avatar={
					<Grid className="avatarContainer">
						<Icon src={dispatchIcon} type="static" alt="dispatchIcon" />
						<Typography variant="subtitle1" component="div" className="dispatchCardTitle">
							{dispatch.name}
						</Typography>
					</Grid>
				}
				action={
					<Grid className="actionContainer">
						<Icon
							src={pinIcon}
							type="pointer"
							status={dispatch.isPinned && dispatch.isPinned === true ? 'active' : null}
							clickHandler={() => onPin(dispatch.id, dispatch.isPinned, dispatch.name)}
							alt="pinIcon"
						/>
						<ContextMenu dispatch={dispatch} type="dispatch" pinDispatch={onPin} />
					</Grid>
				}
			/>
			<CardContent className="cardContent">
				<Grid className="timerContainer">
					{dispatch.status === 'COMPLETED' && (
						<Icon src={dispatchSuccess} type="static" alt="successIcon" />
					)}
					{dispatch.status === 'FAILED' && (
						<Icon src={dispatchError} type="static" alt="errorIcon" />
					)}
					{dispatch.status === 'RUNNING' && (
						<Icon src={dispatchRunning} type="static" alt="runningIcon" />
					)}
					<Typography variant="subtitle2" className="progressText">
						{timeFormatter(dispatch.runTime)}
					</Typography>
				</Grid>
				<Grid className="progressContainer">
					<Typography className="progressRatio" variant="subtitle2">
						{dispatch.completedElectrons}/{dispatch.totalElectrons}
					</Typography>
					{dispatch.status === 'COMPLETED' && (
						<LinearProgress variant="determinate" color="success" value={100} />
					)}
					{dispatch.status === 'FAILED' && (
						<LinearProgress variant="determinate" color="error" value={100} />
					)}
					{dispatch.status === 'RUNNING' && <LinearProgress color="primary" value={100} />}
				</Grid>
			</CardContent>
		</Card>
	);
}

export default DispatchCard;
