import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'

export default function Cards({ taskList }) {

 const navigate = useNavigate();

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {taskList.map((task) => (
            <Grid key={task._id} item onClick={() => navigate(`/add-task/${task._id}`)}>
              <Paper
                sx={{
                  cursor: 'pointer',
                  minHeight: 220,
                  width: 300,
                  border: '1px solid grey',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Box m={2}>
                  <Typography>
                    {task.title}
                  </Typography>
                </Box>
                <Box m={2}>
                  <Typography>
                    {`Details: ${task.description}`}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
