import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Divider, Stack, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/HomeTwoTone';
import ClassIcon from '@mui/icons-material/ClassTwoTone';
import AboutIcon from '@mui/icons-material/Abc';
import Header from '../components/Header';

export default function Home() {
	return (
		<>
			<Header/>
			<Typography variant="h5" color="primary" paragraph><HomeIcon color="primary"/>Home</Typography>

			<Stack
				alignItems="center"
				justifyContent="center"
				direction={{xs: 'column', sm: 'row'}}
				spacing={{ xs: 1, sm: 2, md: 4 }}
				divider={<Divider orientation="vertical" flexItem />}
			>
				<Link to='/'>
					<Button startIcon={<HomeIcon color="primary"/>} color="primary" variant="outlined">Home</Button>
				</Link>
				<Link to='/classroom1'>
					<Button startIcon={<ClassIcon color="primary"/>} color="secondary" variant="contained">ClassRoom 1</Button>
				</Link>
				<Link to='/about'>
					<Button startIcon={<AboutIcon color="secondary"/>} color="primary" variant="contained">About</Button>
				</Link>
			</Stack>
		</>
	);
};