import bcrypt from 'bcryptjs';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
  updateUser,
  deleteUserById,
} from '../models/user-model.js';

// kaikkien käyttäjätietojen haku
const getUsers = async (req, res) => {
  // in real world application, password properties should never be sent to client
  const users = await selectAllUsers();
  res.json(users);
};

// Userin haku id:n perusteella
const getUserById = async (req, res) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await selectUserById(req.params.id);
    console.log('User found:', user);
    // jos user löytyi, eli arvo ei ole undefined, lähetetään se vastauksena
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// käyttäjän lisäys (rekisteröinti)
// lisätään parempi virheenkäsittely myöhemmin
const addUser = async (req, res) => {
  console.log('addUser request body', req.body);
  // esitellään 3 uutta muuttujaa, johon sijoitetaan req.body:n vastaavien propertyjen arvot
  const {username, password, email} = req.body;
  // tarkistetaan, että pyynnössä on kaikki tarvittavat tiedot
  if (username && password && email) {
    // luodaan selväkielisestä sanasta tiiviste, joka tallennetaan kantaan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // luodaan uusi käyttäjä olio ja lisätään se tietokantaa käyttäen modelia
    const newUser = {
      username,
      password: hashedPassword,
      email,
    };
    try {
      const result = await insertUser(newUser);
      res.status(201);
      return res.json({message: 'User added. id: ' + result});
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({message: 'DB error: ' + error.message});
    }
  }
  res.status(400);
  return res.json({
    message: 'Request should have username, password and email properties.',
  });
};

// Userin muokkaus id:n perusteella
const editUser = async (req, res) => {
  console.log('editUser request body', req.body);

  const { username, password, email } = req.body;
  const userId = parseInt(req.params.id, 10); // Ensure it's a number

  try {
    // Check if the user exists
    const existingUser = await selectUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Keep existing values if new ones aren't provided
    let hashedPassword = existingUser.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Call updateUser with separate parameters
    await updateUser(
      userId,
      username || existingUser.username,
      hashedPassword,
      email || existingUser.email
    );

    res.json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Userin poisto id:n perusteella
const deleteUser = async (req, res) => {
  console.log('deleteUser', req.params.id);
  const userId = parseInt(req.params.id, 10);

  try {
    const result = await deleteUserById(userId);
    if (result.affectedRows > 0) {
      res.json({ message: 'User deleted.' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {getUsers, getUserById, addUser, editUser, deleteUser};