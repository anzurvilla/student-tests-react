import {Button, Card, CardActions, CardContent, Stack, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import AboutIcon from '@mui/icons-material/Abc';
import CheckIcon from '@mui/icons-material/Check';
import Header from '../components/Header';

export default function About() {
  return (
    <>
      <Header/>
      
      <Typography variant="h5" color="primary" paragraph><AboutIcon color="secondary"/> About</Typography>
      
      <Stack sx={{ width: '100%' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="subtitle1" color="primary" align="justify" gutterBottom>
             This application helps the teachers to manage the test scores of their students.
            </Typography>
            <Typography sx={{ mb: { xs: 1, sm: 2, md: 4 } }} variant="body1">
              The teacher will be able to review the test scores of the classroom by entering the classroom page through its corresponding button, in this a table of the students will be displayed which contains their test scores. Also in the last row it shows the average score.
            </Typography>
            <Typography variant="body2">
              When the teacher needs to change the value of a test score, just double-click the selected column, then enter the desired value and press Enter to save it. The average score will update automatically.
            </Typography>
          </CardContent>
          <CardActions>
            <Link to='/'>
              <Button startIcon={<CheckIcon />} color="primary">I got it</Button>
            </Link>
          </CardActions>
        </Card>
      </Stack>
    </>
  );
}
