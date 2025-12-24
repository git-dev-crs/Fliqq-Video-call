import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Paper, TextField, Button, Avatar, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import withAuth from '../utils/withAuth';

function UserProfile() {
    const navigate = useNavigate();
    const { getUserDetails } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Loading...");
    const [isEditing, setIsEditing] = useState(false);
    const [editingBio, setEditingBio] = useState(false);

    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData(prev => ({ ...prev, photoUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

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
                        pb: { xs: 4, md: 2 }, // Reduced bottom padding
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
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <label htmlFor="photo-upload" style={{ cursor: 'pointer', display: 'block' }}>
                                    <Typography variant="body1" sx={{ color: '#111827', fontWeight: 500, '&:hover': { color: '#9c27b0' } }}>
                                        Change Photo
                                    </Typography>
                                </label>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="photo-upload"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="photo-upload">
                                        <Typography
                                            component="span"
                                            sx={{
                                                bgcolor: '#f3e8ff',
                                                color: '#9c27b0',
                                                py: 1,
                                                px: 2,
                                                borderRadius: 2,
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                '&:hover': { bgcolor: '#e9d5ff' }
                                            }}
                                        >
                                            Choose File
                                        </Typography>
                                    </label>
                                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                        {fileName}
                                    </Typography>
                                </Box>
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
                                        label="Email / Username"
                                        value={userData.email || userData.username}
                                        fullWidth
                                        disabled
                                        variant="outlined"
                                        InputLabelProps={{
                                            shrink: true,
                                            sx: {
                                                bgcolor: 'white',
                                                px: 1,
                                                color: '#6b7280'
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                bgcolor: '#e2e8f0',
                                                borderRadius: 2,
                                                '& fieldset': { border: 'none' },
                                                '&.Mui-disabled': { bgcolor: '#e2e8f0' } // Ensure disabled state keeps color
                                            },
                                            '& .MuiInputBase-input': {
                                                color: '#334155',
                                                WebkitTextFillColor: '#334155',
                                                fontWeight: 500,
                                                // Explicitly match standard outlined padding if needed, though default usually works
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" sx={{ color: '#111827', fontWeight: 600, mb: 1, ml: 1 }}>
                                        Bio
                                    </Typography>
                                    {!editingBio ? (
                                        <Box
                                            onClick={() => setEditingBio(true)}
                                            sx={{
                                                p: 2,
                                                cursor: 'pointer',
                                                borderRadius: 2,
                                                '&:hover': { bgcolor: '#f9fafb' }
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ color: userData.bio ? '#374151' : '#9ca3af' }}>
                                                {userData.bio || "Click to add bio"}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <TextField
                                            name="bio"
                                            value={userData.bio}
                                            onChange={handleChange}
                                            autoFocus
                                            onBlur={() => setEditingBio(false)}
                                            fullWidth
                                            multiline
                                            rows={3}
                                            variant="outlined"
                                            placeholder="Tell us about yourself"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    bgcolor: 'white',
                                                    '&.Mui-focused fieldset': { borderColor: '#b588d9' }
                                                }
                                            }}
                                        />
                                    )}
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
            <Footer />
        </Box >
    );
}

export default withAuth(UserProfile);
