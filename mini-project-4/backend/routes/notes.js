const router = require('express').Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// Get all notes for a user with optional search and tag filter
router.get('/', auth, async (req, res) => {
    try {
        const { search, tag } = req.query;
        let query = { user: req.user.id };

        if (search) {
            query.$text = { $search: search };
        }

        if (tag) {
            query.tags = tag;
        }

        const notes = await Note.find(query)
            .sort({ createdAt: -1 })
            .select('-__v');

        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all unique tags for a user
router.get('/tags', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).select('tags');
        const tags = [...new Set(notes.flatMap(note => note.tags))];
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new note
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, tags, image } = req.body;
        const note = new Note({
            title,
            content,
            tags,
            image,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a note
router.put('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        const { title, content, tags, image } = req.body;
        note.title = title || note.title;
        note.content = content || note.content;
        note.tags = tags || note.tags;
        note.image = image !== undefined ? image : note.image;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a note
router.delete('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 