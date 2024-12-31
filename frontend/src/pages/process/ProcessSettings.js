import { Alert, Box, Breadcrumbs, Button, Card, CardContent, CssBaseline, DialogActions, DialogContent, Divider, FormControl, FormLabel, Grid2, IconButton, Link, List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../../config';
import { getTextColor } from '../../utils/BgToTextColor';
import CustomizedDialogs from '../../components/CustomizedDialogs';
import AlertDialogSlide from '../../components/AlertDialogSlide';

const emptyFormData = { id: '', name: '', color: '#000', order: 0 }

const ProcessSettings = () => {
    let navigate = useNavigate();

    const [formData, setFormData] = React.useState(emptyFormData);
    const [editFormData, setEditFormData] = React.useState(emptyFormData);
    const [stages, setStages] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [deleteID, setDeleteID] = React.useState(null);

    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
        setEditFormData(emptyFormData)
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const getSingleStage = async (id) => {
        await axios
            .get(`${config.apiUrl}process/get-stage/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                })
            .then(function (response) {
                setEditFormData(response.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });
    }

    const getStages = async () => {
        await axios
            .get(`${config.apiUrl}process/all-stages`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                })
            .then(function (response) {
                setStages(response.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });
    }

    useEffect(() => {
        getStages()
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${config.apiUrl}process/add-stage`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(function (response) {
                getStages()
                toast.success(response.data.message);
                setFormData(emptyFormData)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await axios
            .put(`${config.apiUrl}process/edit-stage`, editFormData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(function (response) {
                getStages()
                toast.success(response.data.message);
                handleModalClose()
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });
    };


    const handleDelete = async () => {
        await axios
            .delete(`${config.apiUrl}process/delete-stage`, {
                data: { id: deleteID },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(function (response) {
                getStages()
                toast.success(response.data.message);
                handleDialogClose();
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });
    };


    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" mb={3}>
                <Link
                    underline="hover"
                    color="inherit"
                    component={RouterLink}
                    to={"/process"}>
                    Process
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Process Settings</Typography>
            </Breadcrumbs>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <CssBaseline enableColorScheme />
                    <Card variant="outlined">
                        <CardContent >
                            <Typography gutterBottom variant="button" >
                                Add Process Stage
                            </Typography>
                            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 2,
                                }}
                            >
                                <FormControl>
                                    <FormLabel htmlFor="stage">Stage *</FormLabel>
                                    <TextField
                                        size='small'
                                        type="text"
                                        name="name"
                                        placeholder="Ex Completed"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        value={formData.name}
                                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="color">Color *</FormLabel>
                                    <TextField
                                        size='small'
                                        name="color"
                                        placeholder="#ddd or red"
                                        type="color"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        value={formData.color}
                                        onChange={(e) => { setFormData({ ...formData, color: e.target.value }) }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="color">Order *</FormLabel>
                                    <TextField
                                        size='small'
                                        name="order"
                                        placeholder="1 or 2"
                                        type="number"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        value={formData.order}
                                        onChange={(e) => { setFormData({ ...formData, order: e.target.value }) }}
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="contained"
                                // onClick={validateInputs}
                                >
                                    Add
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                    <CssBaseline enableColorScheme />
                    <Card variant="outlined">
                        <CardContent >
                            <Typography gutterBottom variant="button" >
                                Stage List
                            </Typography>
                            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                {stages.map((stage) => {
                                    const labelId = `checkbox-list-label-${stage.id}`;

                                    return (
                                        <ListItem
                                            key={stage.id}
                                            secondaryAction={
                                                <>
                                                    {/* <Tooltip title="Edit"> */}
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="Edit"
                                                        onClick={() => { getSingleStage(stage.id); handleModalOpen(); }}
                                                        sx={{
                                                            color: getTextColor(stage.color),
                                                        }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    {/* </Tooltip> */}
                                                    {/* <Tooltip title="Delete"> */}
                                                    <IconButton edge="end" aria-label="Delete"
                                                        onClick={() => { handleDialogOpen(); setDeleteID(stage.id) }}
                                                        sx={{
                                                            color: getTextColor(stage.color),
                                                        }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    {/* </Tooltip> */}
                                                </>
                                            }
                                            disablePadding
                                            divider={true}
                                            sx={{
                                                background: stage.color,
                                                color: getTextColor(stage.color),
                                                marginBottom: 2
                                            }}
                                        >
                                            <ListItemButton role={undefined} dense>
                                                <ListItemText id={labelId} primary={`${stage.name}(${stage.order})`} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            <CustomizedDialogs
                title={'Edit Stage'}
                open={modalOpen}
                handleClose={handleModalClose}>
                <DialogContent dividers>
                    <Card variant="outlined">
                        <CardContent >
                            <Box
                                component="form"
                                onSubmit={handleEditSubmit}
                                noValidate
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 2,
                                }}
                            >
                                <FormControl>
                                    <FormLabel htmlFor="stage">Stage *</FormLabel>
                                    <TextField
                                        size='small'
                                        type="text"
                                        name="name"
                                        placeholder="Ex Completed"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        value={editFormData.name}
                                        onChange={(e) => { setEditFormData({ ...editFormData, name: e.target.value }) }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="color">Color *</FormLabel>
                                    <TextField
                                        size='small'
                                        name="color"
                                        placeholder="#ddd or red"
                                        type="color"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        value={editFormData.color}
                                        onChange={(e) => { setEditFormData({ ...editFormData, color: e.target.value }) }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="color">Order *</FormLabel>
                                    <TextField
                                        size='small'
                                        name="order"
                                        placeholder="1 or 2"
                                        type="number"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        value={editFormData.order}
                                        onChange={(e) => { setEditFormData({ ...editFormData, order: e.target.value }) }}
                                    />
                                </FormControl>

                                <Button
                                    type="submit"
                                    variant="contained"
                                // onClick={validateInputs}
                                >
                                    Edit
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </DialogContent>
                {/* <DialogActions>
                        <Button autoFocus >
                            Save changes
                        </Button>
                    </DialogActions> */}
            </CustomizedDialogs>

            <AlertDialogSlide
                open={dialogOpen}
                title={'Confirm'}
                handleClose={handleDialogClose}
                handleConfirm={handleDelete}
            >
                <Alert severity="error">
                    Are you sure you want to delete this?
                </Alert>
            </AlertDialogSlide>
        </div >
    );
}

export default ProcessSettings;
