import React from 'react';
import { Box, Typography, Button, Container, AppBar, Toolbar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RestoreIcon from '@mui/icons-material/Restore';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({ handleRefresh, handleHomeNavigation, handleHistoryNavigation, handleProfileNavigation, userData }) => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white', p: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    {/* Logo Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', border: 'none', outline: 'none', userSelect: 'none' }} onClick={handleRefresh}>
                        <Box
                            component="img"
                            src="/fliq_logo_white.png"
                            alt="Fliqq Logo"
                            sx={{ height: 35, width: 'auto', border: 'none', outline: 'none' }} // Slightly smaller logo on mobile
                        />
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: { xs: '1.2rem', md: '1.5rem' }, // Responsive font size
                                fontWeight: 800,
                                color: '#b588d9',
                                fontFamily: 'Poppins, sans-serif'
                            }}
                        >
                            Fliqq
                        </Typography>
                    </Box>

                    {/* Navigation Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 } }}> {/* Smaller gap on mobile */}

                        {/* Home */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton onClick={handleHomeNavigation} sx={{ color: '#b588d9' }}>
                                <HomeIcon />
                            </IconButton>
                            <Typography
                                onClick={handleHomeNavigation}
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    color: '#111827',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Home
                            </Typography>
                        </Box>

                        {/* History */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton onClick={handleHistoryNavigation} sx={{ color: '#b588d9' }}>
                                <RestoreIcon />
                            </IconButton>
                            <Typography
                                onClick={handleHistoryNavigation}
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    color: '#111827',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    cursor: 'pointer'
                                }}
                            >
                                History
                            </Typography>
                        </Box>

                        {/* Profile */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <IconButton onClick={handleProfileNavigation} sx={{ color: '#b588d9' }}>
                                <PersonIcon />
                            </IconButton>
                            <Typography
                                onClick={handleProfileNavigation}
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    color: '#111827',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {userData?.username || userData?.name || "User"}
                            </Typography>
                        </Box>

                        {/* Logout - Text on Desktop, Icon on Mobile */}
                        <Button
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/")
                            }}
                            variant="outlined"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
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
                        <IconButton
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/")
                            }}
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                color: '#b588d9'
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
