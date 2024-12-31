import AddIcon from '@mui/icons-material/Add';
import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, DialogContent, Divider, FormControl, FormLabel, Grid2, IconButton, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, styled, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import Editor from 'react-simple-wysiwyg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-toastify';
import { Link as RouterLink, useNavigate } from 'react-router';
import CustomizedDialogs from '../../components/CustomizedDialogs';
import { getTextColor } from '../../utils/BgToTextColor';
import { useTheme } from '@mui/material/styles';
import FullScreenDialog from '../../components/FullScreenDialog';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AlertDialogSlide from '../../components/AlertDialogSlide';



const emptyFormData = { id: '', title: '', stage: '', summary: '', process_stage_id: '' }



const Process = () => {
    const theme = useTheme();
    let navigate = useNavigate();
    const [formData, setFormData] = React.useState(emptyFormData);
    const [editFormData, setEditFormData] = React.useState(emptyFormData);
    const [stages, setStages] = React.useState([]);
    const [processes, setProcesses] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [fullScreen, setFullScreen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);

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

    const getProcesses = async () => {
        await axios
            .get(`${config.apiUrl}process/all-processes`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                })
            .then(function (response) {
                setProcesses(response.data)
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });
    }

    const getSingleProcess = async (id) => {
        await axios
            .get(`${config.apiUrl}process/get-process/${id}`,
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

    useEffect(() => {
        getStages();
        getProcesses();
    }, []);

    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
        setFormData(emptyFormData)
    };

    const handleFullScreenOpen = (id) => {
        getSingleProcess(id)
        setFullScreen(true);
    };

    const handleFullScreenClose = () => {
        setFullScreen(false);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = (fullScreen = true) => {
        setDialogOpen(false);
        if (fullScreen) {
            handleFullScreenOpen(editFormData.id);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${config.apiUrl}process/add-process`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(function (response) {
                getProcesses()
                toast.success(response.data.message);
                setFormData(emptyFormData)
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


    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await axios
            .put(`${config.apiUrl}process/edit-process`, editFormData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(function (response) {
                getProcesses()
                toast.success(response.data.message);
                handleFullScreenClose()
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
            .delete(`${config.apiUrl}process/delete-process`, {
                data: { id: editFormData.id },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(function (response) {
                getProcesses()
                toast.success(response.data.message);
                handleDialogClose(false);
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });
    };


    const ProcessCard = ({ title, summary, color }) => (
        <Card sx={{
            marginY: 2,
            width: '200px',
            border: 0.5,
            borderColor: color
        }}>
            {/* <CardHeader
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        /> */}
            <Typography variant="caption" ml={2} align='center' >
                {title}
            </Typography>
            <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
            <CardContent>
                {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}> */}
                {parse(summary)}
                {/* </Typography> */}
            </CardContent>
        </Card>)


    // const items = Array.from({ length: 40 }, (_, i) => <C />);

    return (
        <div>
            <Stack direction="row"
                spacing={2}
                mb={3}
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                }}>
                <Button variant="contained" onClick={handleModalOpen} startIcon={<AddIcon />}>
                    Add
                </Button>
                <Button component={RouterLink} to="/process-settings" variant="contained" color='secondary' startIcon={<SettingsSuggestIcon />} >
                    Stage Settings
                </Button>
            </Stack>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto", // Scroll horizontally
                    padding: 2,
                    // height: '80vh',
                    // overflowY: 'scroll',
                    "&::-webkit-scrollbar": {
                        height: 8,
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                        borderRadius: 4,
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#555",
                    },
                }}
            >
                {stages.map((stage, index) => (
                    <Box sx={{
                        display: 'block',
                        maxWidth: 250, // Width of each container
                        marginRight: 2,
                        // height: '80vh',
                        // overflowY: 'scroll',
                        borderRadius: 2,
                        "&::-webkit-scrollbar": {
                            // height: 10,
                            width: 4
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: stage.color,
                            borderRadius: 4,
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: stage.color,
                        },
                        border: 1,
                        borderColor: stage.color
                    }}>

                        <Box sx={{
                            minWidth: 200,
                            bgcolor: stage.color,
                            paddingY: 2,
                            color: getTextColor(stage.color)
                        }}>
                            <Typography variant="h6" align='center'>{stage.name}</Typography>
                        </Box>
                        <Card
                            key={index}
                            sx={{// Width of each container
                                borderRadius: 2,
                                paddingX: 1,
                                height: '80vh',
                                overflowY: "auto",
                                "&::-webkit-scrollbar": {
                                    // height: 10,
                                    width: 4
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: stage.color,
                                    borderRadius: 4,
                                },
                                "&::-webkit-scrollbar-thumb:hover": {
                                    backgroundColor: stage.color,
                                },
                            }}
                        >
                            {processes.length != 0 &&
                                processes[`stage${stage.id}`].map((process, idx) => (
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { handleFullScreenOpen(process.id) }}
                                    >
                                        <ProcessCard
                                            key={process.id}
                                            title={process.title}
                                            color={stage.color}
                                            summary={process.summary.length > 100 ? `${process.summary.substring(0, 100)} ........` : process.summary}
                                        />
                                    </div>
                                ))
                            }
                        </Card>
                    </Box>
                ))}
            </Box>

            <CustomizedDialogs
                title={'Add Process'}
                open={modalOpen}
                handleClose={handleModalClose}>
                <DialogContent dividers>
                    <Card variant="outlined">
                        <CardContent >
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
                                    <FormLabel htmlFor="stage">Title *</FormLabel>
                                    <TextField
                                        size='small'
                                        type="text"
                                        name="title"
                                        placeholder="Ex Enquiry"
                                        autoFocus
                                        required
                                        variant="outlined"
                                        value={formData.title}
                                        onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Stage</InputLabel>
                                    <Select
                                        size='small'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={formData.stage}
                                        label="Stage"
                                        onChange={(e) => { setFormData({ ...formData, stage: e.target.value }) }}
                                    >{stages.map((stage) => {
                                        return (
                                            <MenuItem value={stage.id}>{stage.name}</MenuItem>
                                        )
                                    })}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="color">Summary *</FormLabel>
                                    <Editor value={formData.summary} onChange={(e) => { setFormData({ ...formData, summary: e.target.value }) }} />
                                    {/* <TextField
                                        size='small'
                                        name="summary"
                                        placeholder="Summary"
                                        type="text"
                                        autoFocus
                                        required
                                        multiline
                                        minRows={8}
                                        variant="outlined"
                                        value={formData.summary}
                                        onChange={(e) => { setFormData({ ...formData, summary: e.target.value }) }}
                                    /> */}
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
                </DialogContent>
                {/* <DialogActions>
                        <Button autoFocus >
                            Save changes
                        </Button>
                    </DialogActions> */}
            </CustomizedDialogs>
            <FullScreenDialog
                open={fullScreen}
                handleClose={handleFullScreenClose}
                handleDelete={() => { handleDialogOpen(); handleFullScreenClose() }}
                data={editFormData}
            >
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
                        <FormLabel htmlFor="stage">Title *</FormLabel>
                        <TextField
                            size='small'
                            type="text"
                            name="title"
                            placeholder="Ex Enquiry"
                            autoFocus
                            required
                            variant="outlined"
                            value={editFormData.title}
                            onChange={(e) => { setEditFormData({ ...editFormData, title: e.target.value }) }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Stage</InputLabel>
                        <Select
                            size='small'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Stage"
                            // displayEmpty
                            value={editFormData.process_stage_id}
                            onChange={(e) => { setEditFormData({ ...editFormData, process_stage_id: e.target.value }) }}
                        >{stages.map((stage) => {
                            return (
                                <MenuItem value={stage.id}>{stage.name}</MenuItem>
                            )
                        })}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="color">Summary *</FormLabel>
                        <Editor
                            value={editFormData.summary}
                            onChange={(e) => { setEditFormData({ ...editFormData, summary: e.target.value }) }}
                        />
                        {/* <TextField
                            size='small'
                            name="summary"
                            placeholder="Summary"
                            type="text"
                            autoFocus
                            required
                            multiline
                            minRows={8}
                            variant="outlined"
                            value={formData.summary}
                            onChange={(e) => { setFormData({ ...formData, summary: e.target.value }) }}
                        /> */}
                    </FormControl>


                    <Button
                        type="submit"
                        variant="contained"
                    // onClick={validateInputs}
                    >
                        Edit
                    </Button>
                </Box>
            </FullScreenDialog>


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

        </div>
    );
}

export default Process;
