import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {Alert, Box, Snackbar, Stack, Typography} from '@mui/material';
import ClassIcon from '@mui/icons-material/ClassTwoTone';
import {DataGrid} from '@mui/x-data-grid';
import Header from '../components/Header';

function calcAvg(jsonArray) {
	try {
		if(jsonArray && Array.isArray(jsonArray) && jsonArray.length>0) {
			// Filter the JSON Arran without the element with id:0
			let filtered = Object.values(jsonArray).filter(el=>el.id?el:null);
			const sum = filtered.reduce((total, current) => current.score ? total + current.score : total, 0);
			const average = sum / filtered.length;
			return average;
		}
	}
	catch(err) {
		console.error(err.message);
	}
	return 0;
}

export default function ClassRoom1() {

	// Data of the Rows state to store the API request
  const [rows, setRows] = useState([]);
	const [editRowsModel, setEditRowsModel] = useState({});

	// Snackbar model data
	const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

	// Call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      try {
        const response = await axios('http://localhost:8080/api/v1/tests');
        if(response.status===200) {
          setRows([ ...response.data, ...[{ id: 0, name: 'Average Scores', score: calcAvg(response.data)}] ]);
					setSnackbar({ children: 'Data loaded successfully', severity: 'success', variant: 'outlined' });
        }
        else {
					setSnackbar({ children: 'Something bad happened', severity: 'warning', variant: 'filled' });
        }
      } catch(err) {
        console.error(err.message);
				setSnackbar({ children: 'Data load failed', severity: 'error', variant: 'filled' });
      }
    })();
  }, []);

  const handleEditRowsModelChange = useCallback((model) => {
		// Allow editing of all rows except the Average row
    if(!model[0]) setEditRowsModel(model);
  }, []);

  const handleCellEditCommit = useCallback(
			async (params) => {
				try {
					const payload = { [params.field]: params.value };
					const response = await axios.put(`http://localhost:8080/api/v1/test/${params.id}`, payload);
					if(response.status===200) {
						setSnackbar({ children: 'Data saved successfully', severity: 'success', variant: 'filled' });
						setRows((prev) =>
							prev.map((row) => (
									(row.id && row.id === params.id) ? { ...row, ...{id: params.id, ...payload} } : row
								)
							)
						);
						// Update the row with the Average Score data
						setRows((rows) => rows.map((row) => (row.id === 0 ? { ...row, ...{score: calcAvg(rows)} } : row)) );
					}
					else {
						setSnackbar({ children: `Data couldn't saved`, severity: 'warning', variant: 'filled' });
						// Restore the row in case of error
						setRows((prev) => [...prev]);
					}
				} catch(err) {
					console.error(err.response);
					if(err.response.status===400) {
						setSnackbar({ children: `Invalid value ${err.response.data.errors||''}`, severity: 'warning', variant: 'outlined' });
					}
					else {
						setSnackbar({ children: 'Error while saving the data', severity: 'error', variant: 'filled' });
					}
					// Restore the row in case of error
					setRows((prev) => [...prev]);
				}
			},
			[],
  );

	return (
		<>
			<Header/>
			<Typography variant="h5" color="primary" paragraph><ClassIcon color="primary"/>Class Room 1</Typography>

			<Stack sx={{ height: 100, width: '100%' }} spacing={2}>
				<Box
					sx={{
						height: 400,
						width: 1,
						'& .MuiDataGrid-cell--editing': {
							bgcolor: 'rgb(255,215,115, 0.19)',
							color: '#1a3e72',
							'& .MuiInputBase-root': {
								height: '100%',
							},
						},
						'& .Mui-error': {
							bgcolor: (theme) =>
								`rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
							color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
						},
					}}
				>
					<div style={{ width: '100%' }}>
						<DataGrid sx={{ m: {xs: 1, sm: 2, md: 3} }}
							autoHeight
							rows={rows}
							columns={columns}
							editRowsModel={editRowsModel}
							onEditRowsModelChange={handleEditRowsModelChange}
							onCellEditCommit={handleCellEditCommit}
							hideFooterPagination
						/>
					</div>
				</Box>

				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					autoHideDuration={3000}
					open={snackbar?true:false}
					onClose={handleCloseSnackbar}
				>
					<div>{ snackbar && <Alert {...snackbar} onClose={handleCloseSnackbar} /> }</div>
        </Snackbar>

			</Stack>
            
		</>
	);
};

// Define the columns of the DataGrid
const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'name', headerName: 'Student Name', width: 150, headerAlign: 'center' },
  {
    field: 'score',
    headerName: 'Test Score',
		type: 'number',
    width: 100,
		headerAlign: 'center',
    editable: true,
		preProcessEditCellProps: (params) => {
			// Validate the score value with numbers between 0-100
      const isValid = /^([0-9]|[0-9][0-9]|100)$/.test(String(params.props.value));
      return { ...params.props, error: !isValid };
    },
  },
];
