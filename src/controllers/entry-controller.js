import {
  insertEntry,
  selectEntriesByUserId,
  selectEntriesByEntryId,
  updateEntryByEntryId,
  deleteEntryByEntryId
} from '../models/entry-model.js';

const postEntry = async (req, res) => {
  try {
    const newEntry = req.body;
    newEntry.user_id = req.user.user_id;
    await insertEntry(newEntry);
    res.status(201).json({message: 'Entry added.'});
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};


/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res) => {
  const entries = await selectEntriesByUserId(req.user.user_id);
  res.json(entries);
};

// get an entry based on it's entry_id
const getEntryById = async (req, res) => {
  try {
    const entryId = parseInt(req.params.id, 10);
    const entry = await selectEntriesByEntryId(entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json(entry);
  } catch (error) {
    console.error('Error fetching entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// editing/updating entry information
const editEntry = async (req, res) => {
  console.log('editEntry request body', req.body);

  const {mood, weight, sleep_hours, notes} = req.body;
  const entryId = parseInt(req.params.id, 10);

  try {
    //check if entry exists
    const existingEntry = await selectEntriesByEntryId(entryId);
    if(!existingEntry) {
      return res.status(404).json({message: 'Entry not found'});
    }

    //update entry
    await updateEntryByEntryId(
      entryId,
      mood,
      weight,
      sleep_hours,
      notes
    );

    res.json({message: 'Entry updated successfully.'});
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteEntry = async (req, res) => {
  console.log('deleteEntry', req.params.id);
  const entryId = parseInt(req.params.id, 10);

  try {
    const result = await deleteEntryByEntryId(entryId);
    if (result.affectedRows > 0) {
      res.json({ message: 'Entry deleted.' });
    } else {
      res.status(404).json({ message: 'Entry not found' });
    }
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {postEntry, getEntries, getEntryById, editEntry, deleteEntry};
