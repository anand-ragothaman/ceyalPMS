import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import parse from 'html-react-parser';
import { Alert, Box, Container, FormControl, FormLabel, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Editor from 'react-simple-wysiwyg';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose, data, children, handleDelete }) {
    const [editOpen, setEditOpen] = React.useState(false);


    const handleEditOpen = () => {
        setEditOpen(!editOpen);
    };


    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {data.title}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {!editOpen ?
                                <Button
                                    variant='outlined'
                                    color="inherit"
                                    startIcon={<EditIcon />}
                                    onClick={handleEditOpen}>
                                    Edit
                                </Button>
                                :
                                <Button
                                    variant='outlined'
                                    color="inherit"
                                    startIcon={<VisibilityIcon />}
                                    onClick={handleEditOpen}>
                                    View
                                </Button>
                            }
                            <Button
                                variant='outlined'
                                color="danger"
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}>
                                Delete
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Container sx={{ marginY: 2 }}>
                    {!editOpen && parse(data.summary)}

                    {editOpen &&
                        children}

                </Container >
            </Dialog>


        </React.Fragment>
    );
}
