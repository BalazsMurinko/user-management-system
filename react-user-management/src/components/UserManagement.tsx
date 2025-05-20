import React, { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Container
} from '@mui/material';
import { useUserManagement } from '../contexts/UserManagementContext';
import { User } from '../types';
import { UserTable } from './UserTable';
import { RoleTable } from './RoleTable';

interface UserManagementProps {
  onUserSelect?: (user: User) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-management-tabpanel-${index}`}
      aria-labelledby={`user-management-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `user-management-tab-${index}`,
    'aria-controls': `user-management-tabpanel-${index}`,
  };
}

export const UserManagement: React.FC<UserManagementProps> = ({ onUserSelect }) => {
  const [tabValue, setTabValue] = useState(0);
  const { loading, error } = useUserManagement();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ mt: 3, mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="user management tabs"
            variant="fullWidth"
          >
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Roles" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <UserTable onUserSelect={onUserSelect} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <RoleTable />
        </TabPanel>
      </Paper>
    </Container>
  );
};
