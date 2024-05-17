import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cards from '../components/Cards';

const TasksList = () => {
    const [taskList, setTaskList] = useState([]);

    async function fetchAllTasks() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/tasks/all/${localStorage.getItem('userCode')}`)
            .then(res => {
                if (res.status === 200) {
                    setTaskList(res.data)
                }
            })
            .catch(err => {
                // toast.error('Something went wrong !')
            })
    }

    useEffect(() => {
        fetchAllTasks();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                mt={8}
            >
                <Grid>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                        All Tasks
                    </Typography>
                </Grid>
                <Grid mt={2} mb={6}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: '500', color: '#757575' }}>
                        Simplify Your Day, One Task at a Time
                    </Typography>
                </Grid>
            </Grid>
            <Grid >
                {taskList.length === 0 ? <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    mt={20}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#757575' }}>
                        No Task Found
                    </Typography>
                </Grid> : <Cards taskList={taskList} />}
            </Grid>
        </>
    );
}

export default TasksList;