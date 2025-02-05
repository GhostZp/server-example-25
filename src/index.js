import express from 'express';
import { deleteItem, getItemById, getItems, postItem, putItem } from './items.js';
import { getUserById, getUsers, postLogin, postUser, putUser } from './users.js';
import cors from 'cors';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// tätä tarvitaan, jotta Ullan fronttiharjoitukset toimivat (Vite)
// lisää myös: import cors from 'cors'; tiedoston yläosaan
// ja asenna paketti: npm install cors
app.use(cors());

//staattinen html-sivusto tarjoillaan palvelimen juuressa
app.use('/', express.static('public'));
//middleware joka lukee json datan POST pyyntöjen rungosta (body)
app.use(express.json());
//rest-apin resurssit tarjoillaan /api/-polun alla
app.get('/api/', (req, res) => {
  console.log('get-pyyntö juureen havaittuna');
  console.log(req.url);
  res.send('Welcome to my REST API!');
});

// RESOURCE /item endpoints
// GET http://127.0.0.1:3000/api/items
app.get('/api/items', getItems);
// GET http://127.0.0.1:3000/api/items/<ID>
app.get('/api/items/:id', getItemById);
// POST http://127.0.0.1:3000/items/ (Itemin lisäys)
app.post('/api/items', postItem);
// DELETE (Itemin poisto)
app.delete('/api/items/:id', deleteItem);
// PUT
app.put('/api/items/:id', putItem);

// USERS /users endpoints
// GET http://127.0.0.1:3000/api/users
app.get('/api/users', getUsers);
// GET http://127.0.0.1:3000/api/users/2
app.get('/api/users/:id', getUserById);
// POST http://127.0.0.1:3000/api/users
app.post('/api/users', postUser);
// POST http://127.0.0.1:3000/api/users/login
app.post('/api/users/login', postLogin);
// update user
app.put('/api/users/:id', putUser);

// syötteen lukeminen reittiparametreista (route params)
app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

// syötteen lukeminen kyselyparametreista (query params)
app.get('/api/sum/', (req, res) => {
  console.log(req.query);
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  // testataan jos jompikumpi luvuista ei ole numero niin lähetetään
  // virhetilakoodi ja viesti json muodossa
  if(isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      num1,
      num2,
      error: 'Both parameters must be numbers!'
    });
    return;
  }
  res.json({
    num1,
    num2,
    sum: num1 + num2,
  });
});

//POST-pyynnön kösittely ja datan lukeminen pyynnön bodystä
app.post('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(201);
  res.json({reply: 'No moro! ' + req.body.sender});
});

app.get('/api/cat/', (req, res) => {
  console.log(req.query);

  function isCorrectNumber(query, target) {
    return Number (query) === target;
  }

  const queryNumber = req.query.number;

  if(!queryNumber || !isCorrectNumber(queryNumber, 10)) {
    res.status(400).json({
      error: 'Try number 10!'
    });
    return;
  } else {
    console.log('(=^･ω･^=)');
    res.status(200).json ({
      message: 'You guessed correctly!',
    });
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});