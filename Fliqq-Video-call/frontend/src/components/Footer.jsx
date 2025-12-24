import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 2, textAlign: 'center', mt: 'auto', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.05) 0px -4px 10px' }}>
            <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>
                © 2025 Fliqq. All rights reserved.
            </Typography>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1, color: '#6b7280', fontWeight: 600 }}>
                Designed and Developed by <a href="https://www.linkedin.com/in/mohit-jatav-6819a0260/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Mohit Jatav</a>
            </Typography>
        </Box>
    );
};

export default Footer;
