
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const AmbulanceBanner = ({ imageUrl, title, subtitle }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '250px', md: '400px' }, // Adjust the height based on screen size
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <Container
        sx={{
          position: 'relative',
          zIndex: 1,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" component="p" align="center">
          {subtitle}
        </Typography>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add an overlay
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default AmbulanceBanner;
