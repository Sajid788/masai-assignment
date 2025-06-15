import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Chip,
  Autocomplete,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Fade,
  useTheme,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import SortIcon from '@mui/icons-material/Sort';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with 0.7 quality
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      };
    };
  });
};

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', tags: [], image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [availableTags, setAvailableTags] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [contentFilter, setContentFilter] = useState('all');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchNotes();
    fetchTags();
  }, [user, navigate]);

  useEffect(() => {
    filterNotes();
  }, [searchQuery, selectedTag, notes, sortBy, contentFilter]);

  const filterNotes = () => {
    let filtered = [...notes];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter(note => 
        note.tags.includes(selectedTag)
      );
    }

    // Content length filter
    if (contentFilter !== 'all') {
      filtered = filtered.filter(note => {
        const length = note.content.length;
        switch (contentFilter) {
          case 'short':
            return length < 100;
          case 'medium':
            return length >= 100 && length < 500;
          case 'long':
            return length >= 500;
          default:
            return true;
        }
      });
    }
    
    // Sort filter
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setFilteredNotes(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSortBy('newest');
    setContentFilter('all');
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedTag) params.append('tag', selectedTag);

      const response = await axios.get(`${config.API_URL}/api/notes?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/api/notes/tags`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailableTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleOpen = (note = null) => {
    if (note) {
      setCurrentNote(note);
      setIsEditing(true);
    } else {
      setCurrentNote({ title: '', content: '', tags: [], image: null });
      setIsEditing(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentNote({ title: '', content: '', tags: [], image: null });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (isEditing) {
        await axios.put(
          `${config.API_URL}/api/notes/${currentNote._id}`,
          currentNote,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${config.API_URL}/api/notes`,
          currentNote,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      handleClose();
      fetchNotes();
      fetchTags();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${config.API_URL}/api/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchNotes();
        fetchTags();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      try {
        const compressedImage = await compressImage(file);
        setCurrentNote({ ...currentNote, image: compressedImage });
      } catch (error) {
        console.error('Error compressing image:', error);
        alert('Error processing image. Please try a different image.');
      }
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchNotes();
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleTagChange = (event, newValue) => {
    setSelectedTag(newValue);
    fetchNotes();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 4,
        alignItems: 'center',
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        p: 2,
        borderRadius: 2,
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        }}>
          My Notes
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            onClick={() => handleOpen()} 
            sx={{ mr: 2 }}
            startIcon={<AddIcon />}
          >
            New Note
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ 
        mb: 4,
        backgroundColor: 'white',
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search notes by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Grid>
          <Grid xs={12} md={2}>
            <Autocomplete
              options={availableTags}
              value={selectedTag}
              onChange={(event, newValue) => setSelectedTag(newValue)}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Filter by tag" 
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="oldest">Oldest First</MenuItem>
                <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                <MenuItem value="title-desc">Title (Z-A)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Content Length</InputLabel>
              <Select
                value={contentFilter}
                label="Content Length"
                onChange={(e) => setContentFilter(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <FilterListIcon color="primary" />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="short">Short (&lt; 100 chars)</MenuItem>
                <MenuItem value="medium">Medium (100-500 chars)</MenuItem>
                <MenuItem value="long">Long (&gt; 500 chars)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={2}>
            <Tooltip title="Clear all filters">
              <Button
                fullWidth
                variant="outlined"
                onClick={clearFilters}
                startIcon={<ClearIcon />}
                sx={{ height: '56px' }}
              >
                Clear Filters
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredNotes.map((note) => (
          <Grid xs={12} sm={6} md={4} key={note._id}>
            <Fade in={true}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                {note.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={note.image}
                    alt={note.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {note.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {note.content.substring(0, 150)}...
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {note.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          },
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <IconButton 
                    onClick={() => handleOpen(note)}
                    sx={{ 
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDelete(note._id)}
                    sx={{ 
                      color: theme.palette.error.main,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          fontWeight: 'bold',
        }}>
          {isEditing ? 'Edit Note' : 'New Note'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={currentNote.content}
            onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Autocomplete
            multiple
            freeSolo
            options={availableTags}
            value={currentNote.tags}
            onChange={(event, newValue) => {
              setCurrentNote({ ...currentNote, tags: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Tags"
                placeholder="Add tags"
                sx={{ mb: 2 }}
              />
            )}
          />
          <Box sx={{ mt: 2 }}>
            <input
              accept="image/*"
              type="file"
              id="image-upload"
              hidden
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<ImageIcon />}
                sx={{ mb: 2 }}
              >
                {currentNote.image ? 'Change Image' : 'Add Image'}
              </Button>
            </label>
            {currentNote.image && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={currentNote.image}
                  alt="Preview"
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: 200,
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
              },
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard; 