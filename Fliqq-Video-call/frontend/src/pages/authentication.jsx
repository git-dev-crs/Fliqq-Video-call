import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar, Container, Alert } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0); // 0: Login, 1: Register
    const [open, setOpen] = React.useState(false);
    const [isAuthenticating, setIsAuthenticating] = React.useState(false);

    const { handleRegister, handleLogin, handleGoogleLogin } = React.useContext(AuthContext);
    const router = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsAuthenticating(true);
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );
                const { name, email } = userInfo.data;
                await handleGoogleLogin(name, email, email);
            } catch (err) {
                console.log(err);
                setError("Google Login Failed");
                setIsAuthenticating(false);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const handleAuth = async () => {
        setIsAuthenticating(true);
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setName("");
                setPassword("");
                setMessage("User registered successfully. Please Login!");
                setOpen(true);
                setError("");
                setFormState(0); // Switch to login after success
                setIsAuthenticating(false);
            }
        } catch (err) {
            console.log(err);
            let message = (err.response?.data?.message) || "An error occurred";
            setError(message);
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#ffffff',
                position: 'relative'
            }}>
                {/* Creative Sonar Ripple Animation */}
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <Box sx={{
                        position: 'absolute',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: '#a855f7',
                        opacity: 0.7,
                        animation: 'ripple 1.5s linear infinite'
                    }} />
                    <Box sx={{
                        position: 'absolute',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: '#a855f7',
                        opacity: 0.7,
                        animation: 'ripple 1.5s linear infinite',
                        animationDelay: '0.75s'
                    }} />
                    <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: '#a855f7',
                        zIndex: 1
                    }} />
                </Box>

                <Typography sx={{ mt: 2, color: '#6b7280', fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.5px' }}>
                    Authenticating...
                </Typography>
                <style>
                    {`
                        @keyframes ripple {
                            0% {
                                transform: scale(1);
                                opacity: 0.7;
                            }
                            100% {
                                transform: scale(4);
                                opacity: 0;
                            }
                        }
                    `}
                </style>
            </Box>
        );
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f9fafb', // Light gray background
            }}>
                <CssBaseline />
                <Container component="main" maxWidth="xs">
                    <Paper elevation={0} sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' // Soft shadow
                    }}>
                        {/* Branding Section */}
                        <Box
                            onClick={() => router('/')}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                mb: 1,
                                cursor: 'pointer'
                            }}
                        >
                            {/* Logo */}
                            <Box
                                component="img"
                                src="/fliq_logo_white.png"
                                alt="Fliqq Logo"
                                sx={{ height: 40, width: 'auto' }}
                            />
                            <Typography component="h1" variant="h4" sx={{
                                fontWeight: 800,
                                color: '#a855f7', // Purple-500
                                fontFamily: 'Poppins, sans-serif'
                            }}>
                                Fliqq
                            </Typography>
                        </Box>

                        {/* Title */}
                        <Typography component="h2" variant="h6" sx={{ mb: 3, fontWeight: 800, color: '#1f2937', whiteSpace: 'nowrap' }}>
                            {formState === 0 ? "Login to your existing account" : "Register a new account"}
                        </Typography>

                        {/* Google Sign In */}
                        <Box sx={{ mb: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={() => googleLogin()}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px', // Restored optimal gap
                                    textTransform: 'none',
                                    borderColor: '#dadce0',
                                    color: '#3c4043',
                                    bgcolor: 'white',
                                    py: 1,
                                    px: 2, // Standard padding
                                    borderRadius: '4px',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#f8faff',
                                        borderColor: '#dadce0',
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                <Box component="svg" viewBox="0 0 48 48" width="20px" height="20px">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </Box>
                                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, fontFamily: 'Roboto, sans-serif' }}>
                                    Sign in with Google
                                </Typography>
                            </Button>
                        </Box>
                        {/* Toggle Buttons */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Button
                                onClick={() => setFormState(0)}
                                sx={{
                                    bgcolor: formState === 0 ? '#c084fc' : '#e5e7eb', // Purple if active, Gray if not
                                    color: formState === 0 ? 'white' : '#374151',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: formState === 0 ? '#a855f7' : '#d1d5db',
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => setFormState(1)}
                                sx={{
                                    bgcolor: formState === 1 ? '#c084fc' : '#e5e7eb',
                                    color: formState === 1 ? 'white' : '#374151',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: formState === 1 ? '#a855f7' : '#d1d5db',
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* Form Fields */}
                        <Box component="form" noValidate sx={{ width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                        mb: 1,
                                        "&:has(input:-webkit-autofill) .MuiInputLabel-root": {
                                            transform: "translate(14px, -9px) scale(0.75)",
                                            backgroundColor: "white",
                                            padding: "0 4px"
                                        }
                                    }}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email / Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                    mb: 1,
                                    "&:has(input:-webkit-autofill) .MuiInputLabel-root": {
                                        transform: "translate(14px, -9px) scale(0.75)",
                                        backgroundColor: "white",
                                        padding: "0 4px"
                                    }
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                    mb: 2,
                                    "&:has(input:-webkit-autofill) .MuiInputLabel-root": {
                                        transform: "translate(14px, -9px) scale(0.75)",
                                        backgroundColor: "white",
                                        padding: "0 4px"
                                    }
                                }}
                            />

                            {/* Error Message */}
                            {error && (
                                <Typography color="error" variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
                                    {error}
                                </Typography>
                            )}

                            {/* Submit Button */}
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleAuth}
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    bgcolor: '#c084fc', // Purple-400
                                    color: 'white',
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: '#a855f7', // Purple-500
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>

            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setOpen(false)} severity="success" variant="filled" sx={{ width: '100%', bgcolor: '#4caf50' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}