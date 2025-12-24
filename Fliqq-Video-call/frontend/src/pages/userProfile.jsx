import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, TextField, Button, Avatar, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import withAuth from '../utils/withAuth';

function UserProfile() {
    const navigate = useNavigate();
    const { getUserDetails } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [isEditing, setIsEditing] = useState(false);

    // Initial State
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        username: '',
        bio: 'Passionate about connecting people through video.',
        location: 'Earth',
        photoUrl: ''
    });

    // Loading handlers reused from Home
    const handleRefresh = () => {
        setLoadingMessage("Loading...");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/home");
        }, 2000);
    }

    const handleHistoryNavigation = () => {
        setLoadingMessage("Loading Meeting History...");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/history");
        }, 2000);
    }

    const handleProfileNavigation = () => {
        setLoadingMessage("Loading Profile...");
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Already on profile, just stop loading
        }, 2000);
    }

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const details = await getUserDetails(token);
                setUserData(prev => ({ ...prev, ...details }));
            }
        }
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Here you would typically call an API to update user details
        setIsEditing(false);
        // Simulate save
        console.log("Saving user data:", userData);
    };

    if (loading) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#ffffff'
            }}>
                {/* Reusing the Ripple Animation Logic or Component could be better, but implementing inline for speed/consistency with Home */}
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <Box sx={{ position: 'absolute', width: 50, height: 50, borderRadius: '50%', bgcolor: '#a855f7', opacity: 0.7, animation: 'ripple 1.5s linear infinite' }} />
                    <Box sx={{ position: 'absolute', width: 50, height: 50, borderRadius: '50%', bgcolor: '#a855f7', opacity: 0.7, animation: 'ripple 1.5s linear infinite', animationDelay: '0.75s' }} />
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#a855f7', zIndex: 1 }} />
                </Box>
                <style>{`@keyframes ripple { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(4); opacity: 0; } }`}</style>
            </Box>
        )
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
            <Header
                handleRefresh={handleRefresh}
                handleHistoryNavigation={handleHistoryNavigation}
                handleProfileNavigation={handleProfileNavigation}
                userData={userData}
            />

            <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: 6,
                        bgcolor: 'white',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    <Grid container spacing={6}>
                        {/* Left Column: Photo & Action */}
                        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: { md: '1px solid #f3f4f6' } }}>
                            <Box sx={{ position: 'relative', mb: 3 }}>
                                <Avatar
                                    src={userData.photoUrl}
                                    sx={{ width: 150, height: 150, bgcolor: '#f3f4f6', color: '#b588d9', fontSize: '3rem', fontWeight: 600 }}
                                >
                                    {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                                </Avatar>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        bgcolor: 'white',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        '&:hover': { bgcolor: '#f9fafb' }
                                    }}
                                >
                                    <EditIcon sx={{ color: '#6b7280' }} />
                                </IconButton>
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
                                {userData.name || "User Name"}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                                {userData.email}
                            </Typography>
                        </Grid>

                        {/* Right Column: Form Fields */}
                        <Grid item xs={12} md={8}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827' }}>
                                    My Profile
                                </Typography>
                                {!isEditing && (
                                    <Button
                                        startIcon={<EditIcon />}
                                        onClick={() => setIsEditing(true)}
                                        sx={{ color: '#b588d9', textTransform: 'none', fontWeight: 600 }}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Full Name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleChange}
                                        fullWidth
                                        disabled={!isEditing}
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#b588d9' }, '& .MuiInputLabel-root.Mui-focused': { color: '#b588d9' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Username"
                                        name="username"
                                        value={userData.username}
                                        fullWidth
                                        disabled={true} // Usually username/email is not editable
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Bio"
                                        name="bio"
                                        value={userData.bio}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        disabled={!isEditing}
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#b588d9' }, '& .MuiInputLabel-root.Mui-focused': { color: '#b588d9' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Location"
                                        name="location"
                                        value={userData.location}
                                        onChange={handleChange}
                                        fullWidth
                                        disabled={!isEditing}
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#b588d9' }, '& .MuiInputLabel-root.Mui-focused': { color: '#b588d9' } }}
                                    />
                                </Grid>

                                {isEditing && (
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                            sx={{ color: '#6b7280', textTransform: 'none', fontWeight: 600 }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleSave}
                                            sx={{
                                                bgcolor: '#a855f7',
                                                '&:hover': { bgcolor: '#9333ea' },
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                px: 4,
                                                borderRadius: 2
                                            }}
                                        >
                                            Save Changes
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default withAuth(UserProfile);
