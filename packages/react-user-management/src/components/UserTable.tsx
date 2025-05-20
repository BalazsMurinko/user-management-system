import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Box,
  Chip,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useUserManagement } from '../contexts/UserManagementContext';
import { User, UserStatus } from '../types';

interface UserTableProps {
  onUserSelect?: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ onUserSelect }) => {
  const { users, roles, addUser, updateUser, removeUser } = useUserManagement();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{
    id?: string;
    name: string;
    email: string;
    roles: string[];
    status: UserStatus;
  }>({
    id: '',
    name: '',
    email: '',
    roles: [],
    status: 'active',
  });

  const handleOpen = (user: User | null = null) => {
    const handleRowClick = (user: User) => {
      if (onUserSelect) {
        onUserSelect(user);
      } else {
        setEditingUser(user);
        setFormData(user);
        setOpen(true);
      }
    };
    if (user) {
      handleRowClick(user);
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        roles: [],
        status: 'active',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setFormData({
      id: '',
      name: '',
      email: '',
      roles: [],
      status: 'active',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as { name: string; value: string | string[] };
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e: SelectChangeEvent<UserStatus>) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.value as UserStatus,
    }));
  };

  const handleRoleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      roles: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser && formData.id) {
        await updateUser({
          id: formData.id,
          name: formData.name,
          email: formData.email,
          roles: formData.roles,
          status: formData.status
        });
      } else {
        await addUser({
          name: formData.name,
          email: formData.email,
          roles: formData.roles,
          status: formData.status
        });
      }
      setOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await removeUser(userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {user.roles.map((roleId) => (
                      <Chip key={roleId} label={getRoleName(roleId)} size="small" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.status} 
                    color={user.status === 'active' ? 'success' : user.status === 'signed' ? 'info' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpen(user)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(user.id)} size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{ mt: 1 }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 1 }}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                label="Status"
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="signed">Signed</MenuItem>
                <MenuItem value="locked">Locked</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 1 }}>
              <InputLabel id="roles-label">Roles</InputLabel>
              <Select
                labelId="roles-label"
                multiple
                name="roles"
                value={formData.roles}
                onChange={handleRoleChange}
                label="Roles"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={getRoleName(value)} size="small" />
                    ))}
                  </Box>
                )}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              {editingUser ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
