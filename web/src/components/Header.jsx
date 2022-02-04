import {AppBar, Chip, IconButton, Stack, Toolbar, Typography} from '@mui/material/';
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReactIcon from '@mui/icons-material/DeviceHub';
import MuiIcon from '@mui/icons-material/BubbleChart';
import NodeIcon from '@mui/icons-material/Dashboard';
import ExpressIcon from '@mui/icons-material/BlurOn';
import MySQLIcon from '@mui/icons-material/AllInbox';

export default function Header() {

  const refreshPage = () => window.location.reload();

  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Typography variant="h6">
						<IconButton aria-label="home" color="secondary">
							<Link to='/'><HomeIcon color="secondary" /></Link>
						</IconButton>
            Student Tests
            <IconButton aria-label="refresh" color="secondary" onClick={refreshPage}>
              <RefreshIcon />
            </IconButton>
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack direction="row" paddingX={2} paddingTop={1} paddingBottom={2} spacing={{ xs: 0, sm: 2, md: 4 }}>
        <Chip icon={<ReactIcon />} label="React" color="info" variant="outlined" size="small" clickable component="a" href="https://reactjs.org/" />
        <Chip icon={<MuiIcon />} label="MUI" color="primary" variant="outlined" size="small" clickable component="a" href="https://mui.com/" />
        <Chip icon={<NodeIcon />} label="Node" color="success" variant="outlined" size="small" clickable component="a" href="https://nodejs.org/" />
        <Chip icon={<ExpressIcon />} label="Express" color="info" variant="outlined" size="small" clickable component="a" href="https://expressjs.com/" />
        <Chip icon={<MySQLIcon />} label="MySQL" color="secondary" variant="outlined" size="small" clickable component="a" href="https://www.mysql.com/" />
      </Stack>

    </>
  );

}