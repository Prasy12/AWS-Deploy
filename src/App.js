import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Projects from './containers/projects';
import theme from './theme';
import NavBar from './components/navBar/index';
import './App.css';

function App() {
	console.log('ENVs', `${process.env.REACT_APP_ENDPOINT_URL}`);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles
				styles={{
					body: { backgroundColor: '#121212' }
				}}
			/>
			<NavBar />
			<Grid className="mainContainer">
				<Projects />
			</Grid>
		</ThemeProvider>
	);
}

export default App;
