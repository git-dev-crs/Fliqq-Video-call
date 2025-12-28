import React from 'react';
import { Box, Typography, Button, Container, AppBar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleRefresh, handleHomeNavigation, handleHistoryNavigation, handleProfileNavigation, userData }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', p: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    {/* Logo Section - Navigates to Landing Page */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={handleRefresh}>
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
                                fontWeight: 800,
                                color: '#b588d9',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            Fliqq
                        </Typography>
                    </Box>

                    {/* Navigation Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Button
                            startIcon={<HomeIcon sx={{ color: '#b588d9' }} />}
                            onClick={handleHomeNavigation}
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
                            onClick={handleHistoryNavigation}
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

                        {/* User Profile - Navigates to /profile */}
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                            <PersonIcon
                                sx={{ color: '#b588d9', cursor: 'pointer' }}
                                onClick={handleProfileNavigation}
                            />
                            <Typography sx={{ color: '#111827', fontWeight: 500, fontSize: '0.95rem' }}>
                                {userData?.username || userData?.name || "User"}
                            </Typography>
                        </Box>

                        <Button
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/")
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
    );
};

export default Header;
