import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="down" ref={ref} {...props} />;
// });

export default function AlertDialogSlide({ open, title, children, handleClose, handleConfirm }) {


    return (
        <React.Fragment>
            <Dialog
                open={open}
                // TransitionComponent={Transition}
                fullWidth
                keepMounted
                maxWidth={'sm'}
                onClose={handleClose}

            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>NO</Button>
                    <Button onClick={handleConfirm} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
