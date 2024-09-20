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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [updateTaskDescription, setUpdateTaskDescription] = useState('');
  const [updateTaskTitle, setUpdateTaskTitle] = useState('');
  const [updateProjectId, setUpdateProjectId] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Fetch tasks and projects from the server
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
      try {
        const [tasksResponse, projectsResponse] = await Promise.all([
          axios.get('http://localhost:3333/api/task', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:3333/api/project',  {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTasks(tasksResponse.data);
        setProjects(projectsResponse.data);
      } catch (err) {
        // set generic error for now
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add task
  const handleAddTask = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    setError('');

    if (!taskDescription.trim() || !selectedProjectId) {
      setError('Task description and project selection are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3333/api/task', {
        title: taskTitle,
        description: taskDescription,
        projectId: selectedProjectId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTaskDescription('');
      setTaskTitle('');
      setSelectedProjectId('');
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Error adding task.');
    }
  };

  // Update task
  const handleUpdateTask = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    setError('');

    if (!updateTaskDescription.trim() || !updateProjectId) {
      setError('Description required.');
      return;
    }

    if (!updateTaskTitle.trim() || !updateProjectId) {
      setError('Title required');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3333/api/task/${selectedTaskId}`, {
        title: updateTaskTitle,
        description: updateTaskDescription,
        projectId: updateProjectId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === selectedTaskId ? response.data : task))
      );
      closeUpdateModal();
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Error updating task.');
    }
  };

  // handle clicks
  const handleEditClick = (task) => {
    setSelectedTaskId(task.id);
    setUpdateTaskTitle(task.title);
    setUpdateTaskDescription(task.description);
    setUpdateProjectId(task.projectId);
    setIsUpdateModalOpen(true);
  };

  // close update modal after
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedTaskId(null);
    setUpdateTaskTitle('');
    setUpdateTaskDescription('');
    setUpdateProjectId('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      {loading ? (
        <Typography>Loading tasks...</Typography>
      ) : (
        <>
          {error && <Typography color="error">{error}</Typography>}

          <form onSubmit={handleAddTask}>
            <TextField
              variant="outlined"
              label="Task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              variant="outlined"
              label="Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Project</InputLabel>
              <Select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </form>

          <List>
            {tasks.length === 0 ? (
              <Typography>No tasks found.</Typography>
            ) : (
              tasks.map((task) => (
                <ListItem key={task.id}>
                  <ListItemText primary={task.description} />
                  <IconButton edge="end" onClick={() => handleEditClick(task)}>
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>

          {/* Modal for updating task */}
          <Modal
            isOpen={isUpdateModalOpen}
            onRequestClose={closeUpdateModal}
            contentLabel="Update Task"
            className="modal"
            overlayClassName="overlay"
          >
            <Typography variant="h5">Update Task</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleUpdateTask}>
              <TextField
                variant="outlined"
                label="Update Task Description"
                value={updateTaskDescription}
                onChange={(e) => setUpdateTaskDescription(e.target.value)}
                fullWidth
                required
                margin="normal"
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Project</InputLabel>
                <Select
                  value={updateProjectId}
                  onChange={(e) => setUpdateProjectId(e.target.value)}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary">
                Update Task
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

export default Tasks;
