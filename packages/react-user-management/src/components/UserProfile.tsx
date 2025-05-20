import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { User } from '../types';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: '0 auto', mt: 4 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main',
              fontSize: '2rem',
              mr: 2
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body2" color={user.status === 'active' ? 'success.main' : 'error.main'}>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Typography>
          </Box>
        </Box>
        
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Roles:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {user.roles.map((role, index) => (
              <Box 
                key={index}
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                }}
              >
                {role}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
