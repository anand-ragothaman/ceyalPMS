import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, DialogContent, Divider, FormControl, FormLabel, Grid2, IconButton, Paper, Stack, styled, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';


import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import CustomizedDialogs from '../../components/CustomizedDialogs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));



const Process = () => {
    let navigate = useNavigate();

    const [stages, setStages] = React.useState([]);
    const [modalOpen, setModalOpen] = React.useState(false);

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

    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        getStages()
    }, []);



    const C = () => (<Card sx={{ marginBottom: 3, width: '200px' }}>
        {/* <CardHeader
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
        /> */}
        <Typography variant="button" align='center' >
            Add Process Stage
        </Typography>
        <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
        <CardContent>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
            </Typography>
        </CardContent>
    </Card>)


    const items = Array.from({ length: 40 }, (_, i) => <C />);

    return (
        <div>
            <Stack direction="row"
                spacing={2}
                mb={3}
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                }}>
                <Button variant="contained" onClick={handleModalOpen}>
                    <AddIcon /> Add
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

                        <Box sx={{ bgcolor: stage.color, paddingY: 2 }}>
                            <Typography align='center'>{stage.name}</Typography>
                        </Box>
                        <Card
                            key={index}
                            sx={{// Width of each container
                                marginRight: 2,
                                borderRadius: 2,
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
                            <CardContent>
                                {items.map((item, idx) => (

                                    item
                                ))}
                            </CardContent>
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
                                onSubmit={null}
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
                                        name="name"
                                        placeholder="Ex Completed"
                                        autoFocus
                                        required
                                        variant="outlined"
                                    // value={editFormData.name}
                                    // onChange={(e) => { setEditFormData({ ...editFormData, name: e.target.value }) }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="color">Summary *</FormLabel>
                                    <TextField
                                        size='small'
                                        name="color"
                                        placeholder="#ddd or red"
                                        type="color"
                                        autoFocus
                                        required
                                        multiline
                                        minRows={8}
                                        variant="outlined"
                                    // value={editFormData.color}
                                    // onChange={(e) => { setEditFormData({ ...editFormData, color: e.target.value }) }}
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
        </div>
    );
}

export default Process;
