import { createTheme } from '@mui/material/styles';

export default createTheme({
	palette: {
		mode: 'dark',
		text: {
			primary: '#FAFAFA',
			secondary: '#BEBEBE'
		},
		secondary: {
			main: '#3D238333'
		},
		background: {
			paper: '#040406',
			default: '#040406'
		}
	},
	typography: {
		fontFamily: 'Nunito',
		fontWeightLight: 200,
		fontWeightMedium: 300,
		fontWeightRegular: 400,
		h1: {
			fontSize: '2rem',
			fontWeight: 200,
			fontFamily: 'Nunito'
		},
		h2: {
			fontSize: '0.875rem',
			fontWeight: 400,
			fontFamily: 'Nunito'
		},
		button: {
			textTransform: 'none'
		}
	},
	components: {
		MuiTableCell: {
			styleOverrides: {
				root: {
					padding: '0.25rem'
				}
			}
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					'& td': { border: 0 },
					height: '3.125rem'
				}
			}
		},
		MuiTabPanel: {
			styleOverrides: {
				root: {
					padding: '0.375rem'
				}
			}
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					padding: '0.25rem'
				}
			}
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: '3px'
				}
			}
		}
	}
});
