import promisePool from '../utils/database.js';

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ? ,?)',
      [
        entry.user_id,
        entry.entry_date,
        entry.mood,
        entry.weight,
        entry.sleep_hours,
        entry.notes,
      ],
    );
    console.log('inserEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectEntriesByEntryId = async (entryId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE entry_id=?',
      [entryId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const updateEntryByEntryId = async (id, mood, weight, sleep_hours, notes) => {
  try {
    const [result] = await promisePool.query(
      'UPDATE DiaryEntries SET mood = ?, weight = ?, sleep_hours = ?, notes = ? WHERE entry_id = ?',
      [mood, weight, sleep_hours, notes, id],
    );
    console.log('Rows affected:', result.affectedRows);
    return result; // Returning result object
  } catch (error) {
    console.error(error);
    throw new Error('Database error');
  }
};

const deleteEntryByEntryId = async (id) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE entry_id = ?',
      [id],
    );

    console.log('Rows affected:', result.affectedRows);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Database error');
  }
};

export {
  insertEntry,
  selectEntriesByUserId,
  selectEntriesByEntryId,
  updateEntryByEntryId,
  deleteEntryByEntryId,
};
