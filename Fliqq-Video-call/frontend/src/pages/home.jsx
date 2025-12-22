import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Container, AppBar, Toolbar, Paper, IconButton } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../contexts/AuthContext';
import withAuth from '../utils/withAuth';


function Dashboard() {
    const navigate = useNavigate();
    const { getUserDetails } = useContext(AuthContext);
    const [meetingCode, setMeetingCode] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const details = await getUserDetails(token);
                console.log(details)
                setUserData(details);
            }
        }
        fetchUser();
    }, []);

    const handleJoinVideoCall = () => {
        if (meetingCode.trim()) {
            navigate(`/${meetingCode}`)
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', p: 1 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate("/home")}>
                            <Box
                                component="img"
                                src="/fliq_logo_white.png"
                                alt="Fliqq Logo"
                                sx={{ height: 40, width: 'auto' }}
                            />
                            <Typography
                                component="h1"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    color: '#b588d9'
                                }}
                            >
                                Fliqq
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Button
                                startIcon={<HomeIcon sx={{ color: '#b588d9' }} />}
                                onClick={() => navigate("/home")}
                                sx={{
                                    color: '#111827',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    '&:hover': { bgcolor: '#f3f4f6' }
                                }}
                            >
                                Home
                            </Button>

                            <Button
                                startIcon={<RestoreIcon sx={{ color: '#b588d9' }} />}
                                onClick={() => navigate("/history")}
                                sx={{
                                    color: '#111827',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    '&:hover': { bgcolor: '#f3f4f6' }
                                }}
                            >
                                History
                            </Button>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PersonIcon sx={{ color: '#b588d9' }} />
                                <Typography sx={{ color: '#111827', fontWeight: 500, fontSize: '0.95rem' }}>
                                    {userData?.username || userData?.name || "User"}
                                </Typography>
                            </Box>

                            <Button
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    navigate("/auth")
                                }}
                                variant="outlined"
                                sx={{
                                    color: '#b588d9',
                                    borderColor: '#b588d9',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 2,
                                    '&:hover': {
                                        bgcolor: '#fdf4ff',
                                        borderColor: '#9c27b0',
                                        color: '#9c27b0'
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: { xs: 4, md: 10 }, display: 'flex', justifyContent: 'center', px: 3 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 6 },
                        width: '100%',
                        borderRadius: 6,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 6,
                        bgcolor: 'white',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
                            {userData?.name ? `Hello, ${userData.name}! 👋` : "Welcome Back! 👋"}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#6b7280', mb: 2, fontSize: '1.1rem' }}>
                            Enjoy seamless video calling with Fliqq
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                            <TextField
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)}
                                placeholder="Enter Meeting Code"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        bgcolor: '#f9fafb',
                                        '& fieldset': { borderColor: '#e5e7eb' },
                                        '&:hover fieldset': { borderColor: '#d1d5db' },
                                        '&.Mui-focused fieldset': { borderColor: '#b588d9' }
                                    }
                                }}
                            />
                            <Button
                                onClick={handleJoinVideoCall}
                                variant='contained'
                                disabled={!meetingCode}
                                sx={{
                                    bgcolor: '#f3e8ff',
                                    color: '#9c27b0',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    whiteSpace: 'nowrap',
                                    boxShadow: 'none',
                                    border: '1.5px solid #b588d9',
                                    '&:hover': { bgcolor: '#e9d5ff', boxShadow: 'none' },
                                    '&:disabled': { bgcolor: '#f3f4f6', color: '#9ca3af' }
                                }}
                            >
                                Join Meeting
                            </Button>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
                            <Box sx={{ height: '1px', flex: 1, bgcolor: '#e5e7eb' }} />
                            <Typography sx={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>OR</Typography>
                            <Box sx={{ height: '1px', flex: 1, bgcolor: '#e5e7eb' }} />
                        </Box>

                        <Button
                            variant='contained'
                            fullWidth
                            sx={{
                                bgcolor: '#9c27b0',
                                color: 'white',
                                fontWeight: 700,
                                py: 2,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 6px -1px rgba(156, 39, 176, 0.3), 0 2px 4px -1px rgba(156, 39, 176, 0.15)',
                                '&:hover': {
                                    bgcolor: '#8e24aa',
                                    boxShadow: '0 10px 15px -3px rgba(156, 39, 176, 0.4), 0 4px 6px -2px rgba(156, 39, 176, 0.2)'
                                }
                            }}
                            onClick={() => {
                                const randomCode = Math.random().toString(36).substring(2, 7);
                                setMeetingCode(randomCode);
                            }}
                        >
                            ✨ Create New Meeting
                        </Button>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={{
                            width: 220,
                            height: 220,
                            bgcolor: '#f3e8ff',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                width: '120%',
                                height: '120%',
                                borderRadius: '50%',
                                border: '1px dashed #d8b4fe',
                                animation: 'spin 20s linear infinite'
                            }
                        }}>
                            <Box
                                component="img"
                                src="/dashboard_icon.jpg"
                                alt="Fliqq Symbol"
                                sx={{ width: '85%', height: 'auto', mixBlendMode: 'multiply', borderRadius: '50%' }}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Container>
            <Box component="footer" sx={{ py: 2, textAlign: 'center', mt: 'auto', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.05) 0px -4px 10px' }}>
                <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>
                    © 2025 Fliqq. All rights reserved.
                </Typography>
                <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1, color: '#6b7280', fontWeight: 600 }}>
                    Designed and Developed by <a href="https://www.linkedin.com/in/mohit-jatav-6819a0260/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Mohit Jatav</a>
                </Typography>
            </Box>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </Box >
    )
}

export default withAuth(Dashboard);