import * as React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ContextMenu from '../../menu/contextMenu';
import Icon from '../../icon';
import folderClosed from '../../../assets/folderClosed.png';
import dispatchSuccess from '../../../assets/dispatchSuccess.png';
import dispatchRunning from '../../../assets/dispatchRunning.png';
import dispatchError from '../../../assets/dispatchError.png';
import caretDown from '../../../assets/caretDown.png';
import caretRight from '../../../assets/caretRight.png';
import dispatchIcon from '../../../assets/dispatchIcon.png';
import './style.css';

export default function AllListView(props) {
	const {
		header,
		order,
		orderBy,
		onSelectAllClick,
		onPin,
		allExperiments,
		unCategorized,
		allProjects,
		handleOpenAllProjects,
		handleOpenUnCategorized,
		handleOpenAllExperiments,
		timeFormatter
	} = props;
	const dateFormatter = date => {
		return moment(date).format('DD MMM, HH:mm:ss');
	};
	return (
		<Table>
			{!!header.length && (
				<TableRow sx={{ '& td': { border: 0 } }}>
					<TableCell width="50px" align="left">
						<Checkbox size="small" onChange={onSelectAllClick} />
					</TableCell>
					{header.map(h => (
						<TableCell
							width={h.width}
							key={h.label}
							colSpan={h.colSpan || 1}
							align={h.align || 'center'}
							// sortDirection={orderBy === h.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === h.id}
								direction={orderBy === h.id ? order : 'asc'}
								// onClick={createSortHandler(h.id)}
							>
								{h.label}
								{/* {orderBy === h.id ? (
                                        <span>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                                    ) : null} */}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			)}
			<TableBody>
				{unCategorized && (
					<>
						<TableRow sx={{ backgroundColor: unCategorized?.isOpen ? '#0B0B11' : '' }}>
							<TableCell width="5%" align="left">
								{unCategorized?.isOpen && !unCategorized.isLoader && (
									<Icon
										src={caretDown}
										clickHandler={() => handleOpenUnCategorized(false)}
										type="pointer"
										alt="caretDown"
									/>
								)}
								{unCategorized?.isOpen && unCategorized.isLoader && (
									<Icon src={dispatchRunning} alt="runningIcon" type="static" />
								)}
								{!unCategorized?.isOpen && !unCategorized.isLoader && (
									<Icon
										src={caretRight}
										clickHandler={() => handleOpenUnCategorized(true)}
										type="pointer"
										alt="caretRight"
									/>
								)}
							</TableCell>
							<TableCell width="20%" align="left">
								<Typography variant="subtitle1">
									{unCategorized.name}
									<span className="countText">{unCategorized.count} </span>
								</Typography>
							</TableCell>
							<TableCell width="10%" />
							<TableCell width="15%" />
							<TableCell width="8%" />
							<TableCell width="10%" />
							<TableCell width="10%" />
							<TableCell width="5%" align="right">
								<ContextMenu type="project" />
							</TableCell>
						</TableRow>
						{unCategorized?.isOpen &&
							!unCategorized.isLoader &&
							unCategorized.dispatches &&
							unCategorized.dispatches.map(dispatch => (
								<TableRow
									key={dispatch.name}
									sx={{ backgroundColor: unCategorized?.isOpen ? '#0B0B11' : '' }}
								>
									<TableCell width="5%" align="left">
										<Checkbox size="small" color="primary" />
									</TableCell>
									<TableCell width="20%" align="left">
										<TableCell width="20px">
											{dispatch.status === 'COMPLETED' && (
												<Icon src={dispatchSuccess} type="static" alt="successIcon" />
											)}
											{dispatch.status === 'RUNNING' && (
												<Icon src={dispatchRunning} alt="runningIcon" type="static" />
											)}
											{dispatch.status === 'FAILED' && (
												<Icon src={dispatchError} alt="errorIcon" type="static" />
											)}
										</TableCell>
										<TableCell width="20px">
											<Icon src={dispatchIcon} alt="dispatchIcon" type="static" />
										</TableCell>
										<TableCell width="330px">{dispatch.name}</TableCell>
									</TableCell>
									<TableCell align="right" width="10%">
										<Typography variant="subtitle2">
											{dispatch.completedElectrons}/{dispatch.totalElectrons}
										</Typography>
										{dispatch.status === 'COMPLETED' && (
											<LinearProgress variant="determinate" value={100} color="success" />
										)}
										{dispatch.status === 'RUNNING' && <LinearProgress />}
										{dispatch.status === 'FAILED' && (
											<LinearProgress variant="determinate" value={100} color="error" />
										)}
									</TableCell>
									<TableCell align="left" width="15%">
										<Stack direction="row" spacing={1}>
											{dispatch.tags &&
												dispatch.tags.map(tags => (
													<Chip
														variant="filled"
														color="secondary"
														size="small"
														label={tags}
														key={tags}
													/>
												))}
										</Stack>
									</TableCell>
									<TableCell align="left" width="8%">
										{timeFormatter(dispatch.runTime)}
									</TableCell>
									<TableCell align="left" width="10%">
										{dateFormatter(dispatch.startTime)}
									</TableCell>
									<TableCell align="left" width="10%">
										{dateFormatter(dispatch.lastUpdated)}
									</TableCell>
									<TableCell align="right" width="5%">
										<ContextMenu dispatch={dispatch} type="dispatch" pinDispatch={onPin} />
									</TableCell>
								</TableRow>
							))}
					</>
				)}
				{allProjects &&
					allProjects.map((proj, allProjectIndex) => (
						<React.Fragment key={proj.name}>
							<TableRow sx={{ backgroundColor: proj?.isOpen ? '#0B0B11' : '' }} key={proj.name}>
								<TableCell width="5%" align="left">
									{proj?.isOpen && !proj.isLoader && (
										<Icon
											src={caretDown}
											alt="caretDown"
											clickHandler={() =>
												handleOpenAllProjects(allProjectIndex, 'allProjects', false)
											}
											type="pointer"
										/>
									)}
									{proj?.isOpen && proj.isLoader && (
										<Icon src={dispatchRunning} alt="runningIcon" type="static" />
									)}
									{!proj?.isOpen && !proj.isLoader && (
										<Icon
											src={caretRight}
											clickHandler={() =>
												handleOpenAllProjects(allProjectIndex, 'allProjects', true)
											}
											type="pointer"
											alt="caretRight"
										/>
									)}
								</TableCell>
								<TableCell width="20%" align="left">
									{proj?.isEdit ? (
										<input />
									) : (
										<Typography variant="subtitle1">
											{proj.name}
											<span className="countText">{proj.count} </span>
										</Typography>
									)}
								</TableCell>
								<TableCell width="10%" />
								<TableCell width="15%" />
								<TableCell width="8%" />
								<TableCell width="10%" />
								<TableCell width="10%" />
								<TableCell width="5%" align="right">
									<ContextMenu type="project" />
								</TableCell>
							</TableRow>
							{proj?.isOpen &&
								!proj?.isLoader &&
								proj.dispatches &&
								proj.dispatches.map(dispatch => (
									<TableRow
										key={dispatch.name}
										sx={{ backgroundColor: proj?.isOpen ? '#0B0B11' : '' }}
									>
										<TableCell width="5%" align="left">
											<Checkbox size="small" color="primary" />
										</TableCell>
										<TableCell width="20%" align="left">
											<TableCell width="20px">
												{dispatch.status === 'COMPLETED' && (
													<Icon src={dispatchSuccess} type="static" alt="successIcon" />
												)}
												{dispatch.status === 'RUNNING' && (
													<Icon src={dispatchRunning} alt="runningIcon" type="static" />
												)}
												{dispatch.status === 'FAILED' && (
													<Icon src={dispatchError} alt="errorIcon" type="static" />
												)}
											</TableCell>
											<TableCell width="20px">
												<Icon src={dispatchIcon} alt="dispatchIcon" type="static" />
											</TableCell>
											<TableCell width="330px">{dispatch.name}</TableCell>
										</TableCell>
										<TableCell align="right" width="10%">
											<Typography variant="subtitle2">
												{dispatch.completedElectrons}/{dispatch.totalElectrons}
											</Typography>
											{dispatch.status === 'COMPLETED' && (
												<LinearProgress variant="determinate" value={100} color="success" />
											)}
											{dispatch.status === 'RUNNING' && <LinearProgress />}
											{dispatch.status === 'FAILED' && (
												<LinearProgress variant="determinate" value={100} color="error" />
											)}
										</TableCell>
										<TableCell align="left" width="15%">
											<Stack direction="row" spacing={1}>
												{dispatch.tags &&
													dispatch.tags.map(tags => (
														<Chip
															variant="filled"
															color="secondary"
															size="small"
															label={tags}
															key={tags}
														/>
													))}
											</Stack>
										</TableCell>
										<TableCell align="left" width="8%">
											{timeFormatter(dispatch.runTime)}
										</TableCell>
										<TableCell align="left" width="10%">
											{dateFormatter(dispatch.startTime)}
										</TableCell>
										<TableCell align="left" width="10%">
											{dateFormatter(dispatch.lastUpdated)}
										</TableCell>
										<TableCell align="right" width="5%">
											<ContextMenu dispatch={dispatch} type="dispatch" pinDispatch={onPin} />
										</TableCell>
									</TableRow>
								))}
							{proj?.isOpen &&
								!proj.isLoader &&
								proj.experiments &&
								proj.experiments.map((experiment, projectExperimentIndex) => (
									<React.Fragment key={experiment.name}>
										<TableRow sx={{ backgroundColor: proj?.isOpen ? '#0B0B11' : '' }}>
											<TableCell width="5%" align="left">
												{experiment?.isOpen ? (
													<Icon
														src={caretDown}
														alt="caretDown"
														clickHandler={() =>
															handleOpenAllProjects(
																allProjectIndex,
																'allProjectExperiments',
																false,
																projectExperimentIndex
															)
														}
														type="pointer"
													/>
												) : (
													<Icon
														src={caretRight}
														clickHandler={() =>
															handleOpenAllProjects(
																allProjectIndex,
																'allProjectExperiments',
																true,
																projectExperimentIndex
															)
														}
														type="pointer"
														alt="caretRight"
													/>
												)}
											</TableCell>
											<TableCell width="20%" align="left">
												<TableCell width="20px">
													<Icon src={folderClosed} type="static" />
												</TableCell>
												<TableCell width="380px">
													{experiment.name}
													{/* <span className='countText'>{experiment.count} </span> */}
												</TableCell>
											</TableCell>
											<TableCell align="right" width="10%">
												<TableCell align="left" width="20px">
													{experiment.status === 'COMPLETED' && (
														<Icon src={dispatchSuccess} type="static" alt="successIcon" />
													)}
													{experiment.status === 'RUNNING' && (
														<Icon src={dispatchRunning} alt="runningIcon" type="static" />
													)}
													{experiment.status === 'FAILED' && (
														<Icon src={dispatchError} alt="errorIcon" type="static" />
													)}
												</TableCell>
												<TableCell align="right" width="210px">
													{experiment.completedElectrons}/{experiment.totalElectrons}
												</TableCell>
											</TableCell>
											<TableCell align="left" width="15%">
												<Stack direction="row" spacing={1}>
													{experiment.tags &&
														experiment.tags.map(tags => (
															<Chip
																variant="filled"
																color="secondary"
																size="small"
																label={tags}
																key={tags}
															/>
														))}
												</Stack>
											</TableCell>
											<TableCell width="8%" align="left">
												{timeFormatter(experiment.runTime)}
											</TableCell>
											<TableCell align="left" width="10%">
												{dateFormatter(experiment.startTime)}
											</TableCell>
											<TableCell align="left" width="10%">
												{dateFormatter(experiment.lastUpdated)}
											</TableCell>
											<TableCell width="5%" align="right">
												<ContextMenu type="experiment" />
											</TableCell>
										</TableRow>
										{experiment?.isOpen &&
											experiment.dispatches.map((dispatch, dispatchIndex) => (
												<TableRow
													key={dispatch.name}
													sx={{ backgroundColor: experiment?.isOpen ? '#0B0B11' : '' }}
												>
													<TableCell width="5%" align="left">
														<Checkbox size="small" color="primary" />
													</TableCell>
													<TableCell width="20%" align="left">
														<TableCell width="20px">
															{dispatch.status === 'COMPLETED' && (
																<Icon src={dispatchSuccess} type="static" alt="successIcon" />
															)}
															{dispatch.status === 'RUNNING' && (
																<Icon src={dispatchRunning} alt="runningIcon" type="static" />
															)}
															{dispatch.status === 'FAILED' && (
																<Icon src={dispatchError} alt="errorIcon" type="static" />
															)}
														</TableCell>
														<TableCell width="20px">
															<Icon src={dispatchIcon} alt="dispatchIcon" type="static" />
														</TableCell>
														<TableCell width="330px">{dispatch.name}</TableCell>
													</TableCell>
													<TableCell align="right" width="10%">
														<Typography variant="subtitle2">
															{dispatch.completedElectrons}/{dispatch.totalElectrons}
														</Typography>
														{dispatch.status === 'COMPLETED' && (
															<LinearProgress variant="determinate" value={100} color="success" />
														)}
														{dispatch.status === 'RUNNING' && <LinearProgress />}
														{dispatch.status === 'FAILED' && (
															<LinearProgress variant="determinate" value={100} color="error" />
														)}
													</TableCell>
													<TableCell align="left" width="15%">
														<Stack direction="row" spacing={1}>
															{dispatch.tags &&
																dispatch.tags.map(tags => (
																	<Chip
																		variant="filled"
																		color="secondary"
																		size="small"
																		label={tags}
																		key={tags}
																	/>
																))}
														</Stack>
													</TableCell>
													<TableCell align="left" width="8%">
														{timeFormatter(dispatch.runTime)}{' '}
													</TableCell>
													<TableCell align="left" width="10%">
														{dateFormatter(dispatch.startTime)}
													</TableCell>
													<TableCell align="left" width="10%">
														{dateFormatter(dispatch.lastUpdated)}
													</TableCell>
													<TableCell align="right" width="5%">
														<ContextMenu dispatch={dispatch} type="dispatch" pinDispatch={onPin} />
													</TableCell>
												</TableRow>
											))}
									</React.Fragment>
								))}
						</React.Fragment>
					))}
				{allExperiments &&
					allExperiments.map((experiment, allExperimentIndex) => (
						<React.Fragment key={experiment.name}>
							<TableRow sx={{ backgroundColor: experiment?.isOpen ? '#0B0B11' : '' }}>
								<TableCell width="5%" align="left">
									{experiment?.isOpen && !experiment.isLoader && (
										<Icon
											src={caretDown}
											alt="caretDown"
											clickHandler={() => handleOpenAllExperiments(allExperimentIndex, false)}
											type="pointer"
										/>
									)}
									{experiment?.isOpen && experiment.isLoader && (
										<Icon src={dispatchRunning} alt="runningIcon" type="static" />
									)}
									{!experiment?.isOpen && !experiment.isLoader && (
										<Icon
											src={caretRight}
											clickHandler={() => handleOpenAllExperiments(allExperimentIndex, true)}
											type="pointer"
											alt="caretRight"
										/>
									)}
								</TableCell>
								<TableCell width="20%" align="left">
									<TableCell width="20px">
										<Icon src={folderClosed} type="static" />
									</TableCell>
									<TableCell width="380px">
										{experiment.name}
										<span className="countText">{experiment.count} </span>
									</TableCell>
								</TableCell>
								<TableCell align="right" width="10%">
									<TableCell align="left" width="20px">
										{experiment.status === 'COMPLETED' && (
											<Icon src={dispatchSuccess} type="static" alt="successIcon" />
										)}
										{experiment.status === 'RUNNING' && (
											<Icon src={dispatchRunning} alt="runningIcon" type="static" />
										)}
										{experiment.status === 'FAILED' && (
											<Icon src={dispatchError} alt="errorIcon" type="static" />
										)}
									</TableCell>
									<TableCell align="right" width="210px">
										{experiment.completedElectrons}/{experiment.totalElectrons}
									</TableCell>
								</TableCell>
								<TableCell align="left" width="15%">
									<Stack direction="row" spacing={1}>
										{experiment.tags &&
											experiment.tags.map(tags => (
												<Chip
													variant="filled"
													color="secondary"
													size="small"
													label={tags}
													key={tags}
												/>
											))}
									</Stack>
								</TableCell>
								<TableCell width="8%" align="left">
									{timeFormatter(experiment.runTime)}
								</TableCell>
								<TableCell align="left" width="10%">
									{dateFormatter(experiment.startTime)}
								</TableCell>
								<TableCell align="left" width="10%">
									{dateFormatter(experiment.lastUpdated)}
								</TableCell>
								<TableCell width="5%" align="right">
									<ContextMenu type="experiment" />
								</TableCell>
							</TableRow>
							{experiment?.isOpen &&
								experiment.dispatches.map(dispatch => (
									<TableRow
										key={dispatch.name}
										sx={{ backgroundColor: experiment?.isOpen ? '#0B0B11' : '' }}
									>
										<TableCell width="5%" align="left">
											<Checkbox size="small" color="primary" />
										</TableCell>
										<TableCell width="20%" align="left">
											<TableCell width="20px">
												{dispatch.status === 'COMPLETED' && (
													<Icon src={dispatchSuccess} type="static" alt="successIcon" />
												)}
												{dispatch.status === 'RUNNING' && (
													<Icon src={dispatchRunning} alt="runningIcon" type="static" />
												)}
												{dispatch.status === 'FAILED' && (
													<Icon src={dispatchError} alt="errorIcon" type="static" />
												)}
											</TableCell>
											<TableCell width="20px">
												<Icon src={dispatchIcon} alt="dispatchIcon" type="static" />
											</TableCell>
											<TableCell width="330px">{dispatch.name}</TableCell>
										</TableCell>
										<TableCell align="right" width="10%">
											<Typography variant="subtitle2">
												{dispatch.completedElectrons}/{dispatch.totalElectrons}
											</Typography>
											{dispatch.status === 'COMPLETED' && (
												<LinearProgress variant="determinate" value={100} color="success" />
											)}
											{dispatch.status === 'RUNNING' && <LinearProgress />}
											{dispatch.status === 'FAILED' && (
												<LinearProgress variant="determinate" value={100} color="error" />
											)}
										</TableCell>
										<TableCell align="left" width="15%">
											<Stack direction="row" spacing={1}>
												{dispatch.tags &&
													dispatch.tags.map(tags => (
														<Chip
															variant="filled"
															color="secondary"
															size="small"
															label={tags}
															key={tags}
														/>
													))}
											</Stack>
										</TableCell>
										<TableCell align="left" width="8%">
											{timeFormatter(dispatch.runTime)}
										</TableCell>
										<TableCell align="left" width="10%">
											{dateFormatter(dispatch.startTime)}
										</TableCell>
										<TableCell align="left" width="10%">
											{dateFormatter(dispatch.lastUpdated)}
										</TableCell>
										<TableCell align="right" width="5%">
											<ContextMenu dispatch={dispatch} type="dispatch" pinDispatch={onPin} />
										</TableCell>
									</TableRow>
								))}
						</React.Fragment>
					))}
			</TableBody>
		</Table>
	);
}
