import React from 'react';
import { Container, Typography, Box, Button, Grid2, Card, CardContent } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <Box sx={{ backgroundColor: 'background.paper', padding: '60px 0' }}>
                <Container maxWidth="lg">
                    <Grid2 container spacing={4} alignItems="center">
                        <Grid2 item xs={12} md={6}>
                            <Typography variant="h2" gutterBottom>
                                Welcome to CeyalPMS
                            </Typography>
                            <Typography variant="h6" paragraph>
                                Simplify your process management and enhance productivity with our seamless solutions.
                            </Typography>
                            <Box display="flex" gap={2}>
                                <Button component={RouterLink} to={'/process'} variant="contained" color="primary" size="large">
                                    Get Started
                                </Button>
                                <Button variant="outlined" color="primary" size="large">
                                    Learn More
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ backgroundColor: 'grey.100', padding: '60px 0' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom align="center">
                        Key Features
                    </Typography>
                    <Grid2 container spacing={4} justifyContent="center">
                        <Grid2 item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        Process Tracking
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Track your business processes in real-time and make informed decisions.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        Real-Time Analytics
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Visualize data with powerful analytics to drive growth and efficiency.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        Secure Cloud
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Ensure data security with our scalable cloud infrastructure.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Software Flow Section */}
            <Box sx={{ backgroundColor: 'background.paper', padding: '60px 0' }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom align="center">
                        Software Flow
                    </Typography>
                    <Grid2 container spacing={4} justifyContent="center">
                        <Grid2 item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        1. Sign Up
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Create your account and get started with process management.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        2. Add Process
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Add and configure new processes to automate workflows.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                        <Grid2 item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div" align="center">
                                        3. Process Stage
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        Track and manage each process stage for optimal performance.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>

            {/* Footer Section */}
            <Box sx={{ backgroundColor: 'grey.900', color: 'white', padding: '40px 0' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} CeyalPMS. All rights reserved.
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={4} sx={{ marginTop: 2 }}>
                        <Button color="inherit" size="small">Privacy Policy</Button>
                        <Button color="inherit" size="small">Terms of Service</Button>
                        <Button color="inherit" size="small">Contact Us</Button>
                    </Box>
                </Container>
            </Box>
        </div>
    );
};

export default HomePage;
