import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from "material-ui-confirm";

const AddTask = () => {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const confirm = useConfirm();

    function getFetchTaskDetails() {
        axios.get(`${process.env.REACT_APP_API_URL}/${params.id}`)
            .then(res => {
                if (res.status === 200) {
                    setTitle(res.data.title);
                    setDescription(res.data.description);
                }
            })
            .catch(err => {
                // toast.error('Something went wrong !')
            })
    }

    useEffect(() => {
        if (params.id) {
            getFetchTaskDetails();
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (params.id) {
            axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${params.id}`, {
                title,
                description,
                userCode: localStorage.getItem('userCode')
            })
                .then(res => {
                    if (res.status === 200) {
                        toast.info(res.data.message);
                        navigate('/task-list');
                    }
                })
                .catch(err => {
                    if (err.response.data.message) {
                        toast.error(err.response.data.message)
                        return;
                    }
                    toast.error('Something went wrong !')
                })

            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, {
            title,
            description,
            userCode: localStorage.getItem('userCode')
        })
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    setTitle('');
                    setDescription('');
                }
            }).catch(err => {
                console.log('___ err', err.response.data.message)
                if (err.response.data.message) {
                    toast.error(err.response.data.message)
                    return;
                }
                toast.error('Something went wrong !')
            })
    }

    const handleDelete = () => {

        confirm({ description: "This Task will be permanently deleted after this action" })
            .then(() => {
                axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${params.id}`)
                    .then(res => {
                        if (res.status === 200) {
                            toast.error(res.data.message);
                            navigate('/task-list')
                        }
                    })
                    .catch(err => {
                        toast.error('Something went wrong !')
                    })
            })
            .catch(() => {
                // toast.error('Something went wrong !')
            });
    }
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ borderBottom: '1px solid grey', marginTop: 30 }}
            >
                <Grid>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 5 }}>
                        <AddTaskIcon fontSize='medium' /> Add Task
                    </Typography>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 20 }}
                >
                    <Grid xs={3.5} />
                    <Grid xs={5}>
                        <TextField
                            id="title"
                            label="Enter Task Title"
                            variant="outlined"
                            fullWidth
                            required
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={3.5} />
                    <Grid xs={3.5} mt={4} />
                    <Grid xs={5} mt={4}>
                        <TextField
                            id="description"
                            label="Enter Task Details"
                            variant="outlined"
                            multiline
                            fullWidth
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)} />
                    </Grid>
                    <Grid xs={3.5} mt={4} />
                    <Grid xs={3.5} mt={4} />
                    <Grid xs={5} mt={4}>
                        <Button variant='contained' fullWidth type='submit'> Submit </Button>
                    </Grid>
                    <Grid xs={3.5} mt={4} />
                    {params.id && (
                        <>
                            <Grid xs={3.5} mt={4} />
                            <Grid xs={5} mt={4}>
                                <Button variant='contained' fullWidth onClick={handleDelete} color='error'> Delete </Button>
                            </Grid>
                            <Grid xs={3.5} mt={4} />
                        </>
                    )}
                </Grid>
            </form>
        </>
    );
}

export default AddTask;