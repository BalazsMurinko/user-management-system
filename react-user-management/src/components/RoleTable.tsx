import React, { useState, ChangeEvent } from 'react';
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
  Box,
  Chip,
  Tooltip,
  TextareaAutosize,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useUserManagement } from '../contexts/UserManagementContext';
import { Role } from '../types';

type RoleFormData = {
  id?: string;
  name: string;
  description: string;
  authorities: string[];
};

export const RoleTable: React.FC = () => {
  const { roles, addRole, updateRole, removeRole } = useUserManagement();
  const [open, setOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<RoleFormData>({
    id: '',
    name: '',
    description: '',
    authorities: [],
  });
  const [newAuthority, setNewAuthority] = useState('');

  const handleOpen = (role: Role | null = null) => {
    if (role) {
      setEditingRole(role);
      setFormData(role);
    } else {
      setEditingRole(null);
      setFormData({
        name: '',
        description: '',
        authorities: [],
      });
    }
    setNewAuthority('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRole(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAuthority = () => {
    if (newAuthority.trim()) {
      setFormData(prev => ({
        ...prev,
        authorities: [...prev.authorities, newAuthority.trim()],
      }));
      setNewAuthority('');
    }
  };

  const handleRemoveAuthority = (authorityToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      authorities: prev.authorities.filter(authority => authority !== authorityToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRole && formData.id) {
        await updateRole({
          id: formData.id,
          name: formData.name,
          description: formData.description,
          authorities: formData.authorities
        });
      } else {
        await addRole({
          name: formData.name,
          description: formData.description,
          authorities: formData.authorities
        });
      }
      setOpen(false);
    } catch (err) {
      console.error('Error saving role:', err);
    }
  };

  const handleDelete = async (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await removeRole(roleId);
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    }
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
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Authorities</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {role.authorities.map((authority) => (
                      <Chip key={authority} label={authority} size="small" />
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpen(role)} size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(role.id)} size="small" color="error">
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
          <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
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
              name="description"
              label="Description"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              sx={{ mt: 2 }}
            />
            <Box mt={2}>
              <Box display="flex" gap={1} mb={1}>
                <TextField
                  label="Add Authority"
                  variant="outlined"
                  size="small"
                  value={newAuthority}
                  onChange={(e) => setNewAuthority(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  onClick={handleAddAuthority}
                  disabled={!newAuthority.trim()}
                >
                  Add
                </Button>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {formData.authorities.map((authority) => (
                  <Chip
                    key={authority}
                    label={authority}
                    onDelete={() => handleRemoveAuthority(authority)}
                  />
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              {editingRole ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
