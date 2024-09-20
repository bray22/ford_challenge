import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [updateProjectTitle, setUpdateProjectTitle] = useState('');
  const [updateProjectDescription, setUpdateProjectDescription] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3333/api/project', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Error fetching projects.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setError('');

    if (!newProjectTitle.trim() || !newProjectDescription.trim()) {
      setError('Both title and description are required.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:3333/api/project', {
        title: newProjectTitle,
        description: newProjectDescription,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prevProjects) => [...prevProjects, response.data]);
      closeAddModal();
    } catch (err) {
      console.error('Error adding project:', err);
      setError('Error adding project.');
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setError('');

    if (!updateProjectTitle.trim() || !updateProjectDescription.trim()) {
      setError('Both title and description are required.');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:3333/api/project/${selectedProjectId}`, {
        title: updateProjectTitle,
        description: updateProjectDescription,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === selectedProjectId ? response.data : project
        )
      );
      closeUpdateModal();
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Error updating project.');
    }
  };

  const handleEditClick = (project) => {
    setSelectedProjectId(project.id);
    setUpdateProjectTitle(project.title);
    setUpdateProjectDescription(project.description);
    setIsUpdateModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewProjectTitle('');
    setNewProjectDescription('');
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProjectId(null);
    setUpdateProjectTitle('');
    setUpdateProjectDescription('');
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      {loading ? (
        <Typography>Loading projects...</Typography>
      ) : (
        <>
          {error && <Typography color="error">{error}</Typography>}

          <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)}>
            Add New Project
          </Button>

          {/* Modal for adding a new project */}
          <Modal
            isOpen={isAddModalOpen}
            onRequestClose={closeAddModal}
            contentLabel="Add Project"
            className="modal"
            overlayClassName="overlay"
          >
            <Typography variant="h5">Add New Project</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleAddProject}>
              <TextField
                variant="outlined"
                label="Project Title"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                variant="outlined"
                label="Project Description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                fullWidth
                required
                margin="normal"
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" color="primary">
                Add Project
              </Button>
              <Button variant="outlined" color="secondary" onClick={closeAddModal}>
                Cancel
              </Button>
            </form>
          </Modal>

          <List>
            {projects.length === 0 ? (
              <Typography>No projects found.</Typography>
            ) : (
              projects.map((project) => (
                <ListItem key={project.id}>
                  <ListItemText primary={project.title} secondary={project.description} />
                  <IconButton edge="end" onClick={() => handleEditClick(project)}>
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>

          {/* Modal for updating project */}
          <Modal
            isOpen={isUpdateModalOpen}
            onRequestClose={closeUpdateModal}
            contentLabel="Update Project"
            className="modal"
            overlayClassName="overlay"
          >
            <Typography variant="h5">Update Project</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleUpdateProject}>
              <TextField
                variant="outlined"
                label="Update Project Title"
                value={updateProjectTitle}
                onChange={(e) => setUpdateProjectTitle(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <TextField
                variant="outlined"
                label="Update Project Description"
                value={updateProjectDescription}
                onChange={(e) => setUpdateProjectDescription(e.target.value)}
                fullWidth
                required
                margin="normal"
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" color="primary">
                Update Project
              </Button>
              <Button variant="outlined" color="secondary" onClick={closeUpdateModal}>
                Cancel
              </Button>
            </form>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Projects;
