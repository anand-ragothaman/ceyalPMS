import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import config from '../../config';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    // height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignUp(props) {
    const [formData, setFormData] = React.useState({ name: '', email: '', password: '' });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`${config.apiUrl}auth/register`, formData)
            .then(function (response) {
                // localStorage.setItem('authToken', response.data.token);
                toast.success(response.data.message);
                navigate('/sign-in');
            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });
    };


    return (
        <Box {...props}>
            <CssBaseline enableColorScheme />
            {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        align={'center'}
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        CeyalPMS
                    </Typography>
                    <Typography
                        component="h6"
                        variant="h6"
                        sx={{ width: '100%', fontSize: 'clamp(1rem, 20vw, 1.5rem)' }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="name">Full name</FormLabel>
                            <TextField
                                size='small'
                                autoComplete="name"
                                name="name"
                                fullWidth
                                id="name"
                                placeholder="Jon Snow"
                                onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                size='small'
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                size='small'
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type="text"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                            />
                        </FormControl>
                        {/* <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive updates via email."
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Google')}
                            startIcon={<GoogleIcon />}
                        >
                            Sign up with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign up with Facebook')}
                            startIcon={<FacebookIcon />}
                        >
                            Sign up with Facebook
                        </Button> */}
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                component={RouterLink}
                                to={'/sign-in'}
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </Box>
    );
}