import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserIdentity({ open, userCode, setOpen, setUserCode }) {

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        localStorage.setItem('userCode', userCode)
        handleClose();
    }

    const handleRemove = () => {
        localStorage.removeItem('userCode');
        setUserCode('');
        handleClose();
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Please Enter User Code for your Identity"}</DialogTitle>
                <DialogContent>
                    <Box mt={3}>
                        <TextField
                            id="userCode"
                            label="Please Enter User Code"
                            variant="outlined"
                            mt={4}
                            disabled={localStorage.getItem('userCode')}
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemove} variant='contained' color='warning' disabled={!localStorage.getItem('userCode')}>Remove User</Button>
                    <Button onClick={handleSubmit} variant='contained' disabled={localStorage.getItem('userCode')}>Add User</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
