import React from 'react';
import IconButton from '@mui/material/IconButton';
import './style.css';

function Icon({ src, status, clickHandler, type }) {
	return (
		<IconButton
			sx={{
				'&.MuiButtonBase-root:hover': {
					bgcolor: 'transparent'
				},
				cursor: type === 'static' ? 'default' : 'pointer'
			}}
			disableRipple
			size="small"
			onClick={clickHandler}
		>
			<img src={src} className={status} alt="icon" role="presentation" />
		</IconButton>
	);
}

export default Icon;
